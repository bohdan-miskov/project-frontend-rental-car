import { type CarsResponse } from '../../types/car';
import {
  selectFiltersBrand,
  selectFiltersMaxMileage,
  selectFiltersMinMileage,
  selectFiltersRentalPrice,
} from '../filters/selectors';
import { wrapAsyncThunk } from '../helpers/wrapAsyncThunk';

const limit = 12;

export const getCars = wrapAsyncThunk('cars/getAll', async (page, thunkApi) => {
  const state = thunkApi.getState();
  const params = {
    brand: selectFiltersBrand(state),
    rentalPrice: selectFiltersRentalPrice(state),
    minMileage: selectFiltersMinMileage(state),
    maxMileage: selectFiltersMaxMileage(state),
    page,
    limit,
  };

  const response = await axios.get<CarsResponse>('/cars', {
    params,
  });
  return response.data;
});
