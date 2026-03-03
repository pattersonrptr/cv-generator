import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import FormFormacao from './forms/FormFormacao';
import Formacoes from './Formacoes';
import { adicionarFormacao, removerFormacao } from '../store/slices/formacoesSlice';

const CadastroFormacoes = () => {
  const dispatch = useDispatch();
  const formacoes = useSelector((state) => state.formacoes);

  const [codigo, setCodigo] = useState('');
  const [curso, setCurso] = useState('');
  const [instituicao, setInstituicao] = useState('');
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const [textoBotao, setTextoBotao] = useState('Adicionar');

  const componentStates = { codigo, curso, instituicao, inicio, fim, textoBotao };

  const defFormacao = {
    curso: (e) => setCurso(e.target.value),
    instituicao: (e) => setInstituicao(e.target.value),
    inicio: (e) => setInicio(e.target.value),
    fim: (e) => setFim(e.target.value),
  };

  const limparForm = () => {
    setCodigo('');
    setCurso('');
    setInstituicao('');
    setInicio('');
    setFim('');
    setTextoBotao('Adicionar');
  };

  const novaFormacao = (formacao) => dispatch(adicionarFormacao(formacao));
  const apagarFormacao = (id) => dispatch(removerFormacao(id));

  const btnAtualizar = (id) => {
    const f = formacoes.find((f) => f.id === id);
    if (!f) return;
    setCodigo(f.id);
    setCurso(f.curso);
    setInstituicao(f.instituicao);
    setInicio(f.inicio);
    setFim(f.fim);
    setTextoBotao('Atualizar');
  };

  return (
    <>
      <Card>
        <FormFormacao
          novaFormacao={novaFormacao}
          states={componentStates}
          defFormacao={defFormacao}
          limparForm={limparForm}
        />
      </Card>
      <Formacoes
        formacoes={formacoes}
        apagarFormacao={apagarFormacao}
        editarFormacao={btnAtualizar}
      />
    </>
  );
};

export default CadastroFormacoes;
