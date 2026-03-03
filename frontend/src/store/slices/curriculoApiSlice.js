import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { curriculoAPI } from '../../services/api';
import createLogger from '../../services/logger';

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

// ── Slice ─────────────────────────────────────────────────────────────────────

const curriculoApiSlice = createSlice({
  name: 'curriculoApi',
  initialState: {
    list: [],
    savedId: null,
    status: 'idle',  // idle | loading | success | error
    error: null,
  },
  reducers: {
    clearApiStatus(state) {
      state.status = 'idle';
      state.error = null;
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
      .addCase(saveCurriculum.pending, (state) => { state.status = 'loading'; })
      .addCase(saveCurriculum.fulfilled, (state, action) => {
        state.status = 'success';
        state.savedId = action.payload.id;
        state.list.push(action.payload);
      })
      .addCase(saveCurriculum.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });

    // update
    builder
      .addCase(updateCurriculum.fulfilled, (state, action) => {
        const idx = state.list.findIndex((c) => c.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
        state.status = 'success';
      });

    // delete
    builder
      .addCase(deleteCurriculum.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c.id !== action.payload);
        if (state.savedId === action.payload) state.savedId = null;
      });
  },
});

export const { clearApiStatus } = curriculoApiSlice.actions;
export default curriculoApiSlice.reducer;
