import { createSlice } from '@reduxjs/toolkit';
import { getBrands } from './operation';
import {
  setFulfilled,
  setPending,
  setRejected,
} from '../helpers/statusHandlers';
import type { QueryError } from '../../types/error';

type InitialState = {
  items: string[];
  isLoading: boolean;
  error: QueryError | null;
};

const initialState: InitialState = {
  items: [],
  isLoading: false,
  error: null,
};

const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getBrands.pending, state => {
        setPending(state);
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.items = action.payload;
        setFulfilled(state);
      })
      .addCase(getBrands.rejected, (state, action) => {
        setRejected(state, action);
      });
  },
});

export default brandsSlice.reducer;
