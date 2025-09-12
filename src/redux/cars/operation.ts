import { wrapAsyncThunk } from '../helpers/wrapAsyncThunk';

const limit = 12;

export const getCars = wrapAsyncThunk(
  'cars/getAll',
  async (page, thunkApi) => {}
);
