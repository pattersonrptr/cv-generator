import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    formAtual: 'contato',
  },
  reducers: {
    mudarForm(state, action) {
      state.formAtual = action.payload;
    },
  },
});

export const { mudarForm } = uiSlice.actions;
export default uiSlice.reducer;
