import api from '../../services/axiosConfig';
import { wrapAsyncThunk } from '../helpers/wrapAsyncThunk';

export const getBrands = wrapAsyncThunk('brands/getAll', async () => {
  const response = await api.get<string[]>('/brands');
  return response.data;
});
