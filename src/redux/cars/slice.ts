import type { Car } from '../../types/car';
import type { QueryError } from '../../types/error';
import { createSlice } from '@reduxjs/toolkit';
import { getCars } from './operation';
import {
  setListData,
  setListFulfilled,
  setListPending,
  setListRejected,
  setPaginationArrayRejected,
} from '../helpers/statusHandlers';

type InitialState = {
  items: Car[];
  favorites: Set<string>;
  totalItems: number;
  totalPages: number;
  page: number;
  listLoading: boolean;
  listError: QueryError | null;
};

const initialState: InitialState = {
  items: [],
  favorites: new Set<string>(),
  totalItems: 0,
  totalPages: 1,
  page: 1,
  listLoading: false,
  listError: null,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    addToFavorites(state, action) {
      state.favorites.add(action.payload);
    },
    removeFromFavorites(state, action) {
      state.favorites = new Set(
        [...state.favorites].filter(id => id != action.payload)
      );
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
      });
  },
});

export default carsSlice.reducer;

export const { addToFavorites, removeFromFavorites } = carsSlice.actions;
