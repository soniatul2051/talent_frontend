import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Talent, TalentsState } from '../types';

const API_URL = 'https://talent-server-5gdg.onrender.com/api/talents';

export const fetchTalents = createAsyncThunk(
  'talents/fetchTalents',
  async (skill: string | undefined, { rejectWithValue }) => {
    try {
      const url = skill ? `${API_URL}?skill=${encodeURIComponent(skill)}` : API_URL;
      const response = await axios.get<Talent[]>(url);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch talents');
    }
  }
);

export const addTalent = createAsyncThunk(
  'talents/addTalent',
  async (talentData: Omit<Talent, '_id' | 'createdAt'>, { rejectWithValue }) => {
    try {
      const response = await axios.post<Talent>(API_URL, talentData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add talent');
    }
  }
);

const initialState: TalentsState = {
  items: [],
  loading: false,
  error: null
};

const talentsSlice = createSlice({
  name: 'talents',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTalents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTalents.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTalents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addTalent.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(addTalent.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  }
});

export const { clearError } = talentsSlice.actions;
export default talentsSlice.reducer;