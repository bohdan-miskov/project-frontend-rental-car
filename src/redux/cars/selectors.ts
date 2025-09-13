import type { RootState } from '../store';

export const selectCars = (state: RootState) => state.cars.items;
export const selectFavorites = (state: RootState) => state.cars.favorites;
export const selectTotalItems = (state: RootState) => state.cars.totalItems;
export const selectTotalPages = (state: RootState) => state.cars.totalPages;
export const selectPage = (state: RootState) => state.cars.page;
export const listLoading = (state: RootState) => state.cars.listLoading;
export const listError = (state: RootState) => state.cars.listError;
