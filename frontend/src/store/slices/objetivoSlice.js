import { createSlice } from '@reduxjs/toolkit';

const objetivoSlice = createSlice({
  name: 'objetivo',
  initialState: '',
  reducers: {
    setObjetivo(_state, action) {
      return action.payload;
    },
    resetObjetivo() {
      return '';
    },
  },
});

export const { setObjetivo, resetObjetivo } = objetivoSlice.actions;
export default objetivoSlice.reducer;
