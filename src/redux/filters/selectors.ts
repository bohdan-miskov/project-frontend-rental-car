import type { RootState } from '../store';

export const selectFiltersBrand = (state: RootState) => state.filters.brand;
export const selectFiltersRentalPrice = (state: RootState) =>
  state.filters.rentalPrice;
export const selectFiltersMinMileage = (state: RootState) =>
  state.filters.minMileage;
export const selectFiltersMaxMileage = (state: RootState) =>
  state.filters.maxMileage;
