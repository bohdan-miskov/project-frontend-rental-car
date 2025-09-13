import api from '../../services/axiosConfig';
import { type CarDetails } from '../../types/car';
import { wrapAsyncThunk } from '../helpers/wrapAsyncThunk';

export const getCarDetails = wrapAsyncThunk<string, CarDetails>(
  'recipeDetails',
  async (id: string) => {
    const response = await api.get<CarDetails>(`/cars/${id}`);
    return response.data;
  }
);
