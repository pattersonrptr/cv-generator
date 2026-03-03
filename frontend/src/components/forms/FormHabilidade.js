import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import FormField from '../FormField';
import uniqid from 'uniqid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPrint, faSave } from '@fortawesome/free-solid-svg-icons';
import { mudarForm } from '../../store/slices/uiSlice';
import { saveCurriculum } from '../../store/slices/curriculoApiSlice';
import createLogger from '../../services/logger';

const logger = createLogger('FormHabilidade');

const FormHabilidade = (props) => {
  const dispatch = useDispatch();
  const contato = useSelector((state) => state.contato);
  const objetivo = useSelector((state) => state.objetivo);
  const formacoes = useSelector((state) => state.formacoes);
  const experiencias = useSelector((state) => state.experiencias);
  const habilidades = useSelector((state) => state.habilidades);
  const apiStatus = useSelector((state) => state.curriculoApi.status);

  const { novaHabilidade, states, limparForm, defHabilidade, printRef } = props;

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `curriculo-${contato.nome || 'cv'}`,
  });

  const handleSave = () => {
    logger.info('Saving curriculum for', contato.nome);
    const payload = {
      name: contato.nome,
      email: contato.email,
      phone: contato.telefone,
      address: contato.endereco,
      linkedin: contato.linkedin,
      objetivo,
      educations: formacoes.map((f) => ({
        degree: f.curso,
        institution: f.instituicao,
        start_date: String(f.inicio),
        end_date: String(f.fim),
      })),
      experiences: experiencias.map((e) => ({
        position: e.cargo,
        company: e.empresa,
        start_date: `${e.mesInicio}/${e.anoInicio}`,
        end_date: `${e.mesFim}/${e.anoFim}`,
      })),
      skills: habilidades.map((h) => ({ name: h.habilidade, level: h.nivel })),
    };
    dispatch(saveCurriculum(payload));
  };

  const submitForm = (e) => {
    e.preventDefault();
    const habilidade = {
      id: e.target.codigo.value === '' ? uniqid() : e.target.codigo.value,
      habilidade: e.target.habilidade.value,
      nivel: e.target.nivel.value,
    };
    novaHabilidade(habilidade);
    limparForm();
    e.target.habilidade.focus();
  };

  return (
    <>
      <h2>Habilidades</h2>
      <form action='' onSubmit={submitForm}>
        <input type='hidden' name='codigo' value={states.codigo} />
        <FormField id='habilidade' label='Habilidade:' atributos={{ type: 'text', minLength: 3, name: 'habilidade' }} iptValue={states.habilidade} iptChange={defHabilidade.habilidade} />
        <FormField id='nivel' label='Nível:' atributos={{ type: 'text', minLength: 3, name: 'nivel' }} iptValue={states.nivel} iptChange={defHabilidade.nivel} />
        <div className='botoes'>
          <button type='submit' className='mr-auto'>{states.textoBotao}</button>
          <button type='button' onClick={() => dispatch(mudarForm('experiencia'))}>
            <FontAwesomeIcon icon={faArrowLeft} alt='Seta para a esquerda' title='Anterior' />
          </button>
          <button type='button' onClick={handlePrint} title='Imprimir PDF'>
            <FontAwesomeIcon icon={faPrint} alt='Impressora' />
          </button>
          <button
            type='button'
            onClick={handleSave}
            disabled={apiStatus === 'loading'}
            title='Salvar currículo'
          >
            <FontAwesomeIcon icon={faSave} alt='Salvar' />
          </button>
        </div>
      </form>
    </>
  );
};

export default FormHabilidade;
