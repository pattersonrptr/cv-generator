import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { curriculoAPI } from '../../services/api';
import createLogger from '../../services/logger';
import { setContato, resetContato } from './contatoSlice';
import { setObjetivo, resetObjetivo } from './objetivoSlice';
import { setFormacoes, resetFormacoes } from './formacoesSlice';
import { setExperiencias, resetExperiencias } from './experienciasSlice';
import { setHabilidades, resetHabilidades } from './habilidadesSlice';

const logger = createLogger('curriculoApiSlice');

// ── Thunks ────────────────────────────────────────────────────────────────────

export const fetchCurriculums = createAsyncThunk(
  'curriculoApi/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await curriculoAPI.getAll();
      return data;
    } catch (err) {
      logger.error('fetchCurriculums failed', err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const saveCurriculum = createAsyncThunk(
  'curriculoApi/save',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await curriculoAPI.create(payload);
      logger.info('Curriculum saved, id=' + data.id);
      return data;
    } catch (err) {
      logger.error('saveCurriculum failed', err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateCurriculum = createAsyncThunk(
  'curriculoApi/update',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await curriculoAPI.update(id, payload);
      logger.info('Curriculum updated, id=' + id);
      return data;
    } catch (err) {
      logger.error('updateCurriculum failed', err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteCurriculum = createAsyncThunk(
  'curriculoApi/delete',
  async (id, { rejectWithValue }) => {
    try {
      await curriculoAPI.remove(id);
      logger.info('Curriculum deleted, id=' + id);
      return id;
    } catch (err) {
      logger.error('deleteCurriculum failed', err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Carrega um currículo salvo no form para edição
export const loadCurriculumToForm = createAsyncThunk(
  'curriculoApi/loadToForm',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await curriculoAPI.getById(id);
      dispatch(resetContato());
      dispatch(resetObjetivo());
      dispatch(resetFormacoes());
      dispatch(resetExperiencias());
      dispatch(resetHabilidades());

      dispatch(setContato({
        nome: data.name || '',
        email: data.email || '',
        telefone: data.phone || '',
        endereco: data.address || '',
        linkedin: data.linkedin || '',
      }));
      dispatch(setObjetivo(data.objetivo || ''));
      dispatch(setFormacoes((data.educations || []).map((e) => ({
        id: e.id || String(Math.random()),
        curso: e.degree,
        instituicao: e.institution,
        inicio: e.start_date,
        fim: e.end_date,
      }))));
      dispatch(setExperiencias((data.experiences || []).map((e) => ({
        id: e.id || String(Math.random()),
        cargo: e.position,
        empresa: e.company,
        mesInicio: e.start_date?.split('/')[0] || '',
        anoInicio: e.start_date?.split('/')[1] || '',
        mesFim: e.end_date?.split('/')[0] || '',
        anoFim: e.end_date?.split('/')[1] || '',
        tarefas: e.tasks || '',
      }))));
      dispatch(setHabilidades((data.skills || []).map((s) => ({
        id: s.id || String(Math.random()),
        habilidade: s.name,
        nivel: s.level,
      }))));
      logger.info('Curriculum loaded to form, id=' + id);
      return data;
    } catch (err) {
      logger.error('loadCurriculumToForm failed', err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ── Slice ─────────────────────────────────────────────────────────────────────

const curriculoApiSlice = createSlice({
  name: 'curriculoApi',
  initialState: {
    list: [],
    savedId: null,
    status: 'idle',       // idle | loading | success | error  (para listagem)
    saveStatus: 'idle',   // idle | loading | success | error  (para save/update)
    saveMessage: null,
    error: null,
  },
  reducers: {
    clearApiStatus(state) {
      state.status = 'idle';
      state.error = null;
    },
    clearSaveStatus(state) {
      state.saveStatus = 'idle';
      state.saveMessage = null;
    },
  },
  extraReducers: (builder) => {
    // fetchAll
    builder
      .addCase(fetchCurriculums.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchCurriculums.fulfilled, (state, action) => {
        state.status = 'success';
        state.list = action.payload;
      })
      .addCase(fetchCurriculums.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });

    // save
    builder
      .addCase(saveCurriculum.pending, (state) => { state.saveStatus = 'loading'; })
      .addCase(saveCurriculum.fulfilled, (state, action) => {
        state.saveStatus = 'success';
        state.saveMessage = 'Currículo salvo com sucesso!';
        state.savedId = action.payload.id;
        state.list.push(action.payload);
      })
      .addCase(saveCurriculum.rejected, (state, action) => {
        state.saveStatus = 'error';
        state.saveMessage = 'Erro ao salvar. Tente novamente.';
        state.error = action.payload;
      });

    // update
    builder
      .addCase(updateCurriculum.pending, (state) => { state.saveStatus = 'loading'; })
      .addCase(updateCurriculum.fulfilled, (state, action) => {
        const idx = state.list.findIndex((c) => c.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
        state.saveStatus = 'success';
        state.saveMessage = 'Currículo atualizado com sucesso!';
        state.savedId = action.payload.id;
      })
      .addCase(updateCurriculum.rejected, (state, action) => {
        state.saveStatus = 'error';
        state.saveMessage = 'Erro ao atualizar. Tente novamente.';
        state.error = action.payload;
      });

    // delete
    builder
      .addCase(deleteCurriculum.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c.id !== action.payload);
        if (state.savedId === action.payload) state.savedId = null;
      });
  },
});

export const { clearApiStatus, clearSaveStatus } = curriculoApiSlice.actions;
export default curriculoApiSlice.reducer;
