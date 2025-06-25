import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type Category = {
  id: string;
  name: string;
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await axios.get(process.env.REACT_APP_API_URL as string);
    return response.data as Category[];
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: { list: [] as Category[], status: 'idle' },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'succeeded';
      });
  }
});

export default categorySlice.reducer;