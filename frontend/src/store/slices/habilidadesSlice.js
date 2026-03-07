import { createSlice } from '@reduxjs/toolkit';

const habilidadesSlice = createSlice({
  name: 'habilidades',
  initialState: [],
  reducers: {
    adicionarHabilidade(state, action) {
      const idx = state.findIndex((h) => h.id === action.payload.id);
      if (idx !== -1) {
        state[idx] = action.payload;
      } else {
        state.push(action.payload);
      }
    },
    removerHabilidade(state, action) {
      return state.filter((h) => h.id !== action.payload);
    },
    resetHabilidades() {
      return [];
    },
    setHabilidades(_, action) {
      return action.payload;
    },
  },
});

export const { adicionarHabilidade, removerHabilidade, resetHabilidades, setHabilidades } =
  habilidadesSlice.actions;
export default habilidadesSlice.reducer;
