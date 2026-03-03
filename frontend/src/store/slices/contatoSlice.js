import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nome: '',
  email: '',
  telefone: '',
  linkedin: '',
  endereco: '',
};

const contatoSlice = createSlice({
  name: 'contato',
  initialState,
  reducers: {
    setContato(state, action) {
      return { ...state, ...action.payload };
    },
    resetContato() {
      return initialState;
    },
  },
});

export const { setContato, resetContato } = contatoSlice.actions;
export default contatoSlice.reducer;
