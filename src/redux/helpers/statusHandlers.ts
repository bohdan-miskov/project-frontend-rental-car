import type { CarsResponse } from '../../types/car';
import type { AppAction, RootState } from '../store';

export const setPending = (state: RootState) => {
  state.isLoading = true;
  state.error = null;
};

export const setListPending = (state: RootState) => {
  state.listLoading = true;
  state.listError = null;
};

export const setOperationPending = (state: RootState) => {
  state.operationLoading = true;
  state.operationError = null;
};

export const setFulfilled = (state: RootState) => {
  state.isLoading = false;
};

export const setListFulfilled = (state: RootState) => {
  state.listLoading = false;
};

export const setListData = (
  state: RootState,
  action: AppAction<CarsResponse>
) => {
  state.items = action.payload.cars;
  state.totalItems = action.payload.totalCars;
  state.totalPages = action.payload.totalPages;
  state.page = action.payload.page;
};

export const setOperationFulfilled = (state: RootState) => {
  state.operationLoading = false;
};

export const setListRejected = (state: RootState, action: AppAction<Error>) => {
  state.listLoading = false;
  state.listError = action.payload;
};

export const setOperationRejected = (
  state: RootState,
  action: AppAction<Error>
) => {
  state.operationLoading = false;
  state.operationError = action.payload;
};

export const setRejected = (state: RootState, action: AppAction<Error>) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const setPaginationArrayRejected = (state: RootState) => {
  state.items = [];
  state.hasPreviousPage = false;
  state.hasNextPage = false;
  state.page = 1;
  state.totalPages = 1;
  state.totalItems = 0;
};
