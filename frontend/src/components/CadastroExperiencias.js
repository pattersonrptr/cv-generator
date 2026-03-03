import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import Experiencias from './Experiencias';
import FormExperiencia from './forms/FormExperiencia';
import { adicionarExperiencia, removerExperiencia } from '../store/slices/experienciasSlice';

const CadastroExperiencias = () => {
  const dispatch = useDispatch();
  const experiencias = useSelector((state) => state.experiencias);

  const [codigo, setCodigo] = useState('');
  const [cargo, setCargo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [mesInicio, setMesInicio] = useState('');
  const [anoInicio, setAnoInicio] = useState('');
  const [mesFim, setMesFim] = useState('');
  const [anoFim, setAnoFim] = useState('');
  const [tarefas, setTarefas] = useState('');
  const [textoBotao, setTextoBotao] = useState('Adicionar');

  const componentStates = {
    codigo, cargo, empresa, mesInicio, anoInicio, mesFim, anoFim, tarefas, textoBotao,
  };

  const defExperiencia = {
    cargo: (e) => setCargo(e.target.value),
    empresa: (e) => setEmpresa(e.target.value),
    mesInicio: (e) => setMesInicio(e.target.value),
    anoInicio: (e) => setAnoInicio(e.target.value),
    mesFim: (e) => setMesFim(e.target.value),
    anoFim: (e) => setAnoFim(e.target.value),
    tarefas: (e) => setTarefas(e.target.value),
  };

  const limparForm = () => {
    setCodigo(''); setCargo(''); setEmpresa('');
    setMesInicio(''); setAnoInicio(''); setMesFim(''); setAnoFim('');
    setTarefas(''); setTextoBotao('Adicionar');
  };

  const novaExperiencia = (experiencia) => dispatch(adicionarExperiencia(experiencia));
  const apagarExperiencia = (id) => dispatch(removerExperiencia(id));

  const btnAtualizar = (id) => {
    const e = experiencias.find((e) => e.id === id);
    if (!e) return;
    setCodigo(e.id); setCargo(e.cargo); setEmpresa(e.empresa);
    setMesInicio(e.mesInicio); setAnoInicio(e.anoInicio);
    setMesFim(e.mesFim); setAnoFim(e.anoFim);
    setTarefas(e.tarefas.join('. ')); setTextoBotao('Atualizar');
  };

  return (
    <>
      <Card>
        <FormExperiencia
          novaExperiencia={novaExperiencia}
          states={componentStates}
          limparForm={limparForm}
          defExperiencia={defExperiencia}
        />
      </Card>
      <Experiencias
        experiencias={experiencias}
        apagarExperiencia={apagarExperiencia}
        editarExperiencia={btnAtualizar}
      />
    </>
  );
};

export default CadastroExperiencias;
