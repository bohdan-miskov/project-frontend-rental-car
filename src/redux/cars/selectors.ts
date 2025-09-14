import type { RootState } from '../store';

export const selectCars = (state: RootState) => state.cars.items;
export const selectFavorites = (state: RootState) => state.cars.favorites;
export const selectTotalItems = (state: RootState) => state.cars.totalItems;
export const selectTotalPages = (state: RootState) => state.cars.totalPages;
export const selectPage = (state: RootState) => state.cars.page;
export const selectListLoading = (state: RootState) => state.cars.listLoading;
export const selectListError = (state: RootState) => state.cars.listError;
export const selectOperationLoading = (state: RootState) =>
  state.cars.operationLoading;
export const selectOperationError = (state: RootState) =>
  state.cars.operationError;
