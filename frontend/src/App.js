import { useRef } from 'react';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import store from './store';
import Header from './components/Header';
import Footer from './components/Footer';
import Formulario from './components/Formulario';
import Curriculo from './components/curriculo/Curriculo';
import CurriculoList from './components/CurriculoList';
import './App.css';

const AppContent = () => {
  const printRef = useRef();
  const view = useSelector((state) => state.ui.view);

  return (
    <>
      <Header />
      <main>
        {view === 'list' ? (
          <CurriculoList />
        ) : (
          <>
            <section className='dados'>
              <Formulario printRef={printRef} />
            </section>
            <Curriculo ref={printRef} />
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
