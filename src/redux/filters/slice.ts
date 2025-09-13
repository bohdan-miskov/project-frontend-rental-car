import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  brand: string | null;
  rentalPrice: string | null;
  minMileage: string | null;
  maxMileage: string | null;
  page: number;
};

const initialState: InitialState = {
  brand: null,
  rentalPrice: null,
  minMileage: null,
  maxMileage: null,
  page: 1,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setBrand(state, action) {
      state.brand = action.payload.toString().trim().toLowerCase();
      state.page = 1;
    },
    setRentalPrice(state, action) {
      state.rentalPrice = action.payload.toString().trim().toLowerCase();
      state.page = 1;
    },
    setMinMileage(state, action) {
      state.minMileage = action.payload.toString().trim().toLowerCase();
      state.page = 1;
    },
    setMaxMileage(state, action) {
      state.maxMileage = action.payload.toString().trim().toLowerCase();
      state.page = 1;
    },
    setNextPage(state) {
      state.page += 1;
    },
    clearFilters(state) {
      state.brand = null;
      state.rentalPrice = null;
      state.minMileage = null;
      state.maxMileage = null;
      state.page = 1;
    },
  },
});

export default filtersSlice.reducer;

export const {
  setBrand,
  setRentalPrice,
  setMinMileage,
  setMaxMileage,
  setNextPage,
  clearFilters,
} = filtersSlice.actions;
