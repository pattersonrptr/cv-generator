import { createSlice } from '@reduxjs/toolkit';

const formacoesSlice = createSlice({
  name: 'formacoes',
  initialState: [],
  reducers: {
    adicionarFormacao(state, action) {
      const idx = state.findIndex((f) => f.id === action.payload.id);
      if (idx !== -1) {
        state[idx] = action.payload;
      } else {
        state.push(action.payload);
      }
    },
    removerFormacao(state, action) {
      return state.filter((f) => f.id !== action.payload);
    },
    resetFormacoes() {
      return [];
    },
  },
});

export const { adicionarFormacao, removerFormacao, resetFormacoes } = formacoesSlice.actions;
export default formacoesSlice.reducer;
