import type { Car } from '../../types/car';
import type { QueryError } from '../../types/error';
import { createSlice } from '@reduxjs/toolkit';
import { getCars } from './operation';
import {
  setListData,
  setListFulfilled,
  setListPending,
  setListRejected,
} from '../helpers/statusHandlers';

type InitialState = {
  items: Car[];
  totalItems: number;
  totalPages: number;
  page: number;
  listLoading: boolean;
  listError: QueryError | null;
  operationLoading: boolean;
  operationError: QueryError | null;
};

const initialState: InitialState = {
  items: [],
  totalItems: 0,
  totalPages: 1,
  page: 1,
  listLoading: false,
  listError: null,
  operationLoading: false,
  operationError: null,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCars.pending, state => {
        setListPending(state);
      })
      .addCase(getCars.fulfilled, (state, action) => {
        setListData(state, action);
        setListFulfilled(state);
      })
      .addCase(getCars.rejected, (state, action) => {
        setListRejected(state, action);
      });
  },
});

export default carsSlice.reducer;
