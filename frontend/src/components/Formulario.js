import { useSelector } from 'react-redux';
import Card from './Card';
import FormContato from './forms/FormContato';
import FormObjetivo from './forms/FormObjetivo';
import CadastroFormacoes from './CadastroFormacoes';
import CadastroExperiencias from './CadastroExperiencias';
import CadastroHabilidades from './CadastroHabilidades';

const Formulario = ({ printRef }) => {
  const formAtual = useSelector((state) => state.ui.formAtual);

  switch (formAtual) {
    case 'objetivo':
      return <Card><FormObjetivo /></Card>;
    case 'formacao':
      return <CadastroFormacoes />;
    case 'experiencia':
      return <CadastroExperiencias />;
    case 'habilidade':
      return <CadastroHabilidades printRef={printRef} />;
    default:
      return <Card><FormContato /></Card>;
  }
};

export default Formulario;
