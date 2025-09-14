import api from '../../services/axiosConfig';
import { type BookCar, type CarsResponse } from '../../types/car';
import {
  selectFiltersBrand,
  selectFiltersMaxMileage,
  selectFiltersMinMileage,
  selectFiltersPage,
  selectFiltersRentalPrice,
} from '../filters/selectors';
import { wrapAsyncThunk } from '../helpers/wrapAsyncThunk';

const LIMIT = 12;

export const getCars = wrapAsyncThunk('cars/getAll', async (_, thunkApi) => {
  const state = thunkApi.getState();
  const params = {
    brand: selectFiltersBrand(state),
    rentalPrice: selectFiltersRentalPrice(state),
    minMileage: selectFiltersMinMileage(state),
    maxMileage: selectFiltersMaxMileage(state),
    page: selectFiltersPage(state),
    limit: LIMIT,
  };

  const response = await api.get<CarsResponse>('/cars', {
    params,
  });
  return response.data;
});

export const bookCar = wrapAsyncThunk(
  'cars/book',
  async ({ payload, id }: { payload: BookCar; id: string }) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { payload, id };
  }
);
