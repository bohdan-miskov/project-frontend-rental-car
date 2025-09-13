import type { Car, CarsResponse } from '../../types/car';
import type { ErrorResponse, QueryError } from '../../types/error';
import type { AppAction } from '../store';

type CommonState = {
  isLoading: boolean;
  error: QueryError | null;
};

type ListState = {
  listLoading: boolean;
  listError: QueryError | null;
};

type PaginationArrayState<T> = {
  items: Array<T>;
  totalPages: number;
  totalItems: number;
  page: number;
};

export const setPending = (state: CommonState) => {
  state.isLoading = true;
  state.error = null;
};

export const setListPending = (state: ListState) => {
  state.listLoading = true;
  state.listError = null;
};

export const setFulfilled = (state: CommonState) => {
  state.isLoading = false;
};

export const setListFulfilled = (state: ListState) => {
  state.listLoading = false;
};

export const setListData = (
  state: PaginationArrayState<Car>,
  action: AppAction<CarsResponse>
) => {
  state.items = action.payload.cars;
  state.totalItems = action.payload.totalCars;
  state.totalPages = action.payload.totalPages;
  state.page = action.payload.page;
};

export const setListRejected = (
  state: ListState,
  action: AppAction<ErrorResponse | undefined>
) => {
  state.listLoading = false;
  state.listError = action.payload ?? { message: 'Error' };
};

export const setRejected = (
  state: CommonState,
  action: AppAction<ErrorResponse | undefined>
) => {
  state.isLoading = false;
  state.error = action.payload ?? { message: 'Error' };
};

export const setPaginationArrayRejected = (
  state: PaginationArrayState<Car>
) => {
  state.items = [];
  state.page = 1;
  state.totalPages = 1;
  state.totalItems = 0;
};
