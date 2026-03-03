import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormHabilidade from './forms/FormHabilidade';
import Habilidades from './Habilidades';
import Card from './Card';
import { adicionarHabilidade, removerHabilidade } from '../store/slices/habilidadesSlice';

const CadastroHabilidades = ({ printRef }) => {
  const dispatch = useDispatch();
  const habilidades = useSelector((state) => state.habilidades);

  const [codigo, setCodigo] = useState('');
  const [habilidade, setHabilidade] = useState('');
  const [nivel, setNivel] = useState('');
  const [textoBotao, setTextoBotao] = useState('Adicionar');

  const componentStates = { codigo, habilidade, nivel, textoBotao };

  const defHabilidade = {
    habilidade: (e) => setHabilidade(e.target.value),
    nivel: (e) => setNivel(e.target.value),
  };

  const limparForm = () => {
    setCodigo('');
    setHabilidade('');
    setNivel('');
    setTextoBotao('Adicionar');
  };

  const novaHabilidade = (h) => dispatch(adicionarHabilidade(h));
  const apagarHabilidade = (id) => dispatch(removerHabilidade(id));

  const btnAtualizar = (id) => {
    const h = habilidades.find((h) => h.id === id);
    if (!h) return;
    setCodigo(h.id);
    setHabilidade(h.habilidade);
    setNivel(h.nivel);
    setTextoBotao('Atualizar');
  };

  return (
    <>
      <Card>
        <FormHabilidade
          novaHabilidade={novaHabilidade}
          states={componentStates}
          defHabilidade={defHabilidade}
          limparForm={limparForm}
          printRef={printRef}
        />
      </Card>
      <Habilidades
        habilidades={habilidades}
        apagarHabilidade={apagarHabilidade}
        editarHabilidade={btnAtualizar}
      />
    </>
  );
};

export default CadastroHabilidades;
