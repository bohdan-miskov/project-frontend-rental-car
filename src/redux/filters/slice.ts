import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  brand: string | null;
  rentalPrice: string | null;
  minMileage: string | null;
  maxMileage: string | null;
};

const initialState: InitialState = {
  brand: null,
  rentalPrice: null,
  minMileage: null,
  maxMileage: null,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setBrand(state, action) {
      state.brand = action.payload.toString().trim().toLowerCase();
    },
    setRentalPrice(state, action) {
      state.rentalPrice = action.payload.toString().trim().toLowerCase();
    },
    setMinMileage(state, action) {
      state.minMileage = action.payload.toString().trim().toLowerCase();
    },
    setMaxMileage(state, action) {
      state.maxMileage = action.payload.toString().trim().toLowerCase();
    },
    clearFilters(state) {
      state.brand = null;
      state.rentalPrice = null;
      state.minMileage = null;
      state.maxMileage = null;
    },
  },
});

export default filtersSlice.reducer;

export const {
  setBrand,
  setRentalPrice,
  setMinMileage,
  setMaxMileage,
  clearFilters,
} = filtersSlice.actions;
