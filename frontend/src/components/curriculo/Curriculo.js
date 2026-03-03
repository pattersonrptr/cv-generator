import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import '../../styles/curriculo/Curriculo.css';
import Contato from './Contato';
import Experiencias from './Experiencias';
import FormacaoAcademica from './FormacaoAcademica';
import Habilidades from './Habilidades';
import Objetivo from './Objetivo';

const Curriculo = forwardRef((_props, ref) => {
  const objetivo = useSelector((state) => state.objetivo);
  const habilidades = useSelector((state) => state.habilidades);
  const formacoes = useSelector((state) => state.formacoes);
  const experiencias = useSelector((state) => state.experiencias);

  return (
    <div className='curriculo' ref={ref}>
      <Contato />
      {objetivo !== '' && <Objetivo />}
      {habilidades.length > 0 && <Habilidades />}
      {formacoes.length > 0 && <FormacaoAcademica />}
      {experiencias.length > 0 && <Experiencias />}
    </div>
  );
});

Curriculo.displayName = 'Curriculo';

export default Curriculo;
