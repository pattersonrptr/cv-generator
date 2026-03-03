import { configureStore } from '@reduxjs/toolkit';
import contatoReducer from './store/slices/contatoSlice';
import objetivoReducer from './store/slices/objetivoSlice';
import formacoesReducer from './store/slices/formacoesSlice';
import experienciasReducer from './store/slices/experienciasSlice';
import habilidadesReducer from './store/slices/habilidadesSlice';
import uiReducer from './store/slices/uiSlice';
import curriculoApiReducer from './store/slices/curriculoApiSlice';

const store = configureStore({
  reducer: {
    contato: contatoReducer,
    objetivo: objetivoReducer,
    formacoes: formacoesReducer,
    experiencias: experienciasReducer,
    habilidades: habilidadesReducer,
    ui: uiReducer,
    curriculoApi: curriculoApiReducer,
  },
});

export default store;