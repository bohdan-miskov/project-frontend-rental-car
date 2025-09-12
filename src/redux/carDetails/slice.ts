import { createSlice } from '@reduxjs/toolkit';
import type { CarDetails } from '../../types/car';
import type { QueryError } from '../../types/error';
import { getCarDetails } from './operation';
import {
  setFulfilled,
  setPending,
  setRejected,
} from '../helpers/statusHandlers';

type InitialState = {
  car: CarDetails | null;
  isLoading: boolean;
  error: QueryError | null;
};

const initialState: InitialState = {
  car: null,
  isLoading: false,
  error: null,
};

const carDetailsSlice = createSlice({
  name: 'carDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCarDetails.pending, state => {
        setPending(state);
      })
      .addCase(getCarDetails.fulfilled, (state, action) => {
        state.car = action.payload;
        setFulfilled(state);
      })
      .addCase(getCarDetails.rejected, (state, action) => {
        setRejected(state, action);
      });
  },
});

export default carDetailsSlice.reducer;
