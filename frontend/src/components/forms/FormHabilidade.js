import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import FormField from '../FormField';
import uniqid from 'uniqid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPrint, faSave, faFileCode, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { mudarForm } from '../../store/slices/uiSlice';
import { saveCurriculum, updateCurriculum, clearSaveStatus } from '../../store/slices/curriculoApiSlice';
import { exportToHtml } from '../../services/exportHtml';
import createLogger from '../../services/logger';

const logger = createLogger('FormHabilidade');

const TEMPLATES = [
  { id: 'template1', label: 'Padrão' },
];

const FormHabilidade = (props) => {
  const dispatch = useDispatch();
  const contato = useSelector((state) => state.contato);
  const objetivo = useSelector((state) => state.objetivo);
  const formacoes = useSelector((state) => state.formacoes);
  const experiencias = useSelector((state) => state.experiencias);
  const habilidades = useSelector((state) => state.habilidades);
  const saveStatus = useSelector((state) => state.curriculoApi.saveStatus);
  const saveMessage = useSelector((state) => state.curriculoApi.saveMessage);
  const editingId = useSelector((state) => state.ui.editingId);
  const selectedTemplate = useSelector((state) => state.ui.selectedTemplate);
  const feedbackTimer = useRef(null);

  const { novaHabilidade, states, limparForm, defHabilidade, printRef } = props;

  // Auto-clear do feedback após 4 segundos
  useEffect(() => {
    if (saveStatus === 'success' || saveStatus === 'error') {
      clearTimeout(feedbackTimer.current);
      feedbackTimer.current = setTimeout(() => dispatch(clearSaveStatus()), 4000);
    }
    return () => clearTimeout(feedbackTimer.current);
  }, [saveStatus, dispatch]);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `curriculo-${contato.nome || 'cv'}`,
  });

  const handleHtmlExport = () => {
    if (printRef?.current) {
      exportToHtml(printRef.current.innerHTML, contato.nome);
    }
  };

  const buildPayload = () => ({
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
  });

  const handleSave = () => {
    const payload = buildPayload();
    if (editingId) {
      logger.info('Updating curriculum id=' + editingId);
      dispatch(updateCurriculum({ id: editingId, payload }));
    } else {
      logger.info('Saving new curriculum for', contato.nome);
      dispatch(saveCurriculum(payload));
    }
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

        <div className='template-selector'>
          <label>
            <FontAwesomeIcon icon={faLayerGroup} /> Template:
          </label>
          <select value={selectedTemplate} disabled title='Mais templates em breve'>
            {TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </div>

        {saveStatus === 'success' && (
          <p className='save-feedback save-feedback--success'>{saveMessage}</p>
        )}
        {saveStatus === 'error' && (
          <p className='save-feedback save-feedback--error'>{saveMessage}</p>
        )}

        <div className='botoes'>
          <button type='submit' className='mr-auto'>{states.textoBotao}</button>
          <button type='button' onClick={() => dispatch(mudarForm('experiencia'))}>
            <FontAwesomeIcon icon={faArrowLeft} alt='Seta para a esquerda' title='Anterior' />
          </button>
          <button type='button' onClick={handleHtmlExport} title='Exportar HTML' disabled={!contato.nome}>
            <FontAwesomeIcon icon={faFileCode} />
          </button>
          <button type='button' onClick={handlePrint} title='Imprimir / Salvar PDF' disabled={!contato.nome}>
            <FontAwesomeIcon icon={faPrint} alt='Impressora' />
          </button>
          <button
            type='button'
            onClick={handleSave}
            disabled={saveStatus === 'loading' || !contato.nome}
            title={editingId ? 'Atualizar currículo' : 'Salvar currículo'}
          >
            <FontAwesomeIcon icon={faSave} alt='Salvar' />
          </button>
        </div>
      </form>
    </>
  );
};

export default FormHabilidade;
