import { type CarsResponse } from '../../types/car';
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

  const response = await axios.get<CarsResponse>('/cars', {
    params,
  });
  return response.data;
});
