import { useRef } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Header';
import Footer from './components/Footer';
import Formulario from './components/Formulario';
import Curriculo from './components/curriculo/Curriculo';
import './App.css';

const AppContent = () => {
  const printRef = useRef();
  return (
    <>
      <Header />
      <main>
        <section className='dados'>
          <Formulario printRef={printRef} />
        </section>
        <Curriculo ref={printRef} />
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
