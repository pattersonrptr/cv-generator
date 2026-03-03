import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import FormField from '../FormField';
import { setObjetivo } from '../../store/slices/objetivoSlice';
import { mudarForm } from '../../store/slices/uiSlice';

const FormObjetivo = () => {
  const dispatch = useDispatch();
  const objetivo = useSelector((state) => state.objetivo);

  return (
    <>
      <h2>Objetivo</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <FormField
          id='objetivo'
          label='Objetivo:'
          atributos={{ type: 'text', minLength: 3, name: 'objetivo' }}
          iptValue={objetivo}
          iptChange={(e) => dispatch(setObjetivo(e.target.value))}
        />
        <div className='botoes'>
          <button type='button' onClick={() => dispatch(mudarForm('contato'))} className='ml-auto'>
            <FontAwesomeIcon icon={faArrowLeft} alt='Seta para a esquerda' title='Anterior' />
          </button>
          <button type='submit' onClick={() => dispatch(mudarForm('formacao'))}>
            <FontAwesomeIcon icon={faArrowRight} alt='Seta para a direita' title='Próximo' />
          </button>
        </div>
      </form>
    </>
  );
};

export default FormObjetivo;