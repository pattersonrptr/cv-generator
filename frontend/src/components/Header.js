import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { setView } from '../store/slices/uiSlice';
import '../styles/Header.css';

const Header = () => {
  const dispatch = useDispatch();
  return (
    <header>
      <h1>meuCurrículo</h1>
      <button
        className='header__btn-list'
        onClick={() => dispatch(setView('list'))}
        title='Meus Currículos'
      >
        <FontAwesomeIcon icon={faList} /> Meus Currículos
      </button>
    </header>
  );
};

export default Header;
