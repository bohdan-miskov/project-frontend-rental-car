import type { RootState } from '../store';

export const selectCarDetails = (state: RootState) => state.carDetails.car;
export const selectCarDetailsLoading = (state: RootState) =>
  state.carDetails.isLoading;
export const selectCarDetailsError = (state: RootState) =>
  state.carDetails.error;
