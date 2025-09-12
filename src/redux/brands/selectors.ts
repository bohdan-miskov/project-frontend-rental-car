import type { RootState } from '../store';

export const selectBrands = (state: RootState) => state.brands.items;
export const selectBrandsIsLoading = (state: RootState) =>
  state.brands.isLoading;
export const selectBrandsError = (state: RootState) => state.brands.isLoading;
