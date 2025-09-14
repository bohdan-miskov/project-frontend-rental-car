import type { Car } from '../../types/car';
import type { QueryError } from '../../types/error';
import { createSlice } from '@reduxjs/toolkit';
import { bookCar, getCars } from './operation';
import {
  setListData,
  setListFulfilled,
  setListPending,
  setListRejected,
  setOperationFulfilled,
  setOperationPending,
  setOperationRejected,
  setPaginationArrayRejected,
} from '../helpers/statusHandlers';

type InitialState = {
  items: Car[];
  favorites: string[];
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
  favorites: [],
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
  reducers: {
    addToFavorites(state, action) {
      if (state.favorites.includes(action.payload)) {
        return;
      }

      state.favorites.push(action.payload);
    },
    removeFromFavorites(state, action) {
      state.favorites = state.favorites.filter(id => id != action.payload);
    },
  },
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
        setPaginationArrayRejected(state);
      })
      .addCase(bookCar.pending, state => {
        setOperationPending(state);
      })
      .addCase(bookCar.fulfilled, state => {
        setOperationFulfilled(state);
      })
      .addCase(bookCar.rejected, (state, action) => {
        setOperationRejected(state, action);
      });
  },
});

export default carsSlice.reducer;

export const { addToFavorites, removeFromFavorites } = carsSlice.actions;
