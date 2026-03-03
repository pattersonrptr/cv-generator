import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrash, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { fetchCurriculums, deleteCurriculum, loadCurriculumToForm } from '../store/slices/curriculoApiSlice';
import { startNewCV, setView, setEditingId } from '../store/slices/uiSlice';
import { resetContato } from '../store/slices/contatoSlice';
import { resetObjetivo } from '../store/slices/objetivoSlice';
import { resetFormacoes } from '../store/slices/formacoesSlice';
import { resetExperiencias } from '../store/slices/experienciasSlice';
import { resetHabilidades } from '../store/slices/habilidadesSlice';
import '../styles/CurriculoList.css';

const CurriculoList = () => {
  const dispatch = useDispatch();
  const { list, status } = useSelector((state) => state.curriculoApi);

  useEffect(() => {
    dispatch(fetchCurriculums());
  }, [dispatch]);

  const handleNew = () => {
    dispatch(resetContato());
    dispatch(resetObjetivo());
    dispatch(resetFormacoes());
    dispatch(resetExperiencias());
    dispatch(resetHabilidades());
    dispatch(startNewCV());
  };

  const handleEdit = (id) => {
    dispatch(loadCurriculumToForm(id));
    dispatch(setEditingId(id));
    dispatch(setView('editor'));
  };

  const handleDelete = (id) => {
    if (window.confirm('Excluir este currículo?')) {
      dispatch(deleteCurriculum(id));
    }
  };

  return (
    <div className='cv-list'>
      <div className='cv-list__header'>
        <h1>
          <FontAwesomeIcon icon={faFileAlt} /> Meus Currículos
        </h1>
        <button className='cv-list__btn-new' onClick={handleNew}>
          <FontAwesomeIcon icon={faPlus} /> Novo Currículo
        </button>
      </div>

      {status === 'loading' && <p className='cv-list__msg'>Carregando...</p>}
      {status === 'error' && <p className='cv-list__msg cv-list__msg--error'>Erro ao carregar currículos.</p>}

      {status !== 'loading' && list.length === 0 && (
        <div className='cv-list__empty'>
          <p>Nenhum currículo salvo ainda.</p>
          <button onClick={handleNew}>
            <FontAwesomeIcon icon={faPlus} /> Criar meu primeiro currículo
          </button>
        </div>
      )}

      <ul className='cv-list__items'>
        {list.map((cv) => (
          <li key={cv.id} className='cv-list__item'>
            <div className='cv-list__item-info'>
              <strong>{cv.name || 'Sem nome'}</strong>
              <span>{cv.email}</span>
            </div>
            <div className='cv-list__item-actions'>
              <button onClick={() => handleEdit(cv.id)} title='Editar' className='btn-edit'>
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button onClick={() => handleDelete(cv.id)} title='Excluir' className='btn-delete'>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurriculoList;
