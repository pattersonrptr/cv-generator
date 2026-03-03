import { createSlice } from '@reduxjs/toolkit';

const experienciasSlice = createSlice({
  name: 'experiencias',
  initialState: [],
  reducers: {
    adicionarExperiencia(state, action) {
      const idx = state.findIndex((e) => e.id === action.payload.id);
      if (idx !== -1) {
        state[idx] = action.payload;
      } else {
        state.push(action.payload);
      }
    },
    removerExperiencia(state, action) {
      return state.filter((e) => e.id !== action.payload);
    },
    resetExperiencias() {
      return [];
    },
  },
});

export const { adicionarExperiencia, removerExperiencia, resetExperiencias } =
  experienciasSlice.actions;
export default experienciasSlice.reducer;
