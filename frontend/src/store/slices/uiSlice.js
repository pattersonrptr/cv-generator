import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    formAtual: 'contato',
    view: 'list',           // 'list' | 'editor'
    editingId: null,        // id do currículo em edição, null = novo
    selectedTemplate: 'template1',
  },
  reducers: {
    mudarForm(state, action) {
      state.formAtual = action.payload;
    },
    setView(state, action) {
      state.view = action.payload;
    },
    setEditingId(state, action) {
      state.editingId = action.payload;
    },
    setTemplate(state, action) {
      state.selectedTemplate = action.payload;
    },
    startNewCV(state) {
      state.view = 'editor';
      state.editingId = null;
      state.formAtual = 'contato';
    },
  },
});

export const { mudarForm, setView, setEditingId, setTemplate, startNewCV } = uiSlice.actions;
export default uiSlice.reducer;
