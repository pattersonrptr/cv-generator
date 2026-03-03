import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';

const meses = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

const Experiencias = () => {
  const experiencias = useSelector((state) => state.experiencias);
  return (
    <div className='experienciasProfissionais'>
      <h2><FontAwesomeIcon icon={faClockRotateLeft} />Experiência profissional</h2>
      {[...experiencias].reverse().map((experiencia) => {
        const inicio = `${meses[experiencia.mesInicio - 1]} ${experiencia.anoInicio}`;
        const fim = `${meses[experiencia.mesFim - 1]} ${experiencia.anoFim}`;
        return (
          <div className='experiencia' key={experiencia.id}>
            <h3>{experiencia.cargo}</h3>
            <p>{experiencia.empresa} | {inicio} - {fim}</p>
            <ul>{experiencia.tarefas.map((tarefa, i) => <li key={i}>{tarefa}</li>)}</ul>
          </div>
        );
      })}
    </div>
  );
};

export default Experiencias;
