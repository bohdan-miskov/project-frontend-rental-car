import { createAsyncThunk, type GetThunkAPI } from '@reduxjs/toolkit';
import type { ErrorResponse } from '../../types/error';
import type { RootState } from '../store';

type Config = { state: RootState; rejectValue: ErrorResponse };

type ThunkApi = GetThunkAPI<Config>;

export const wrapAsyncThunk = <Arg, Returned>(
  type: string,
  asyncFunction: (arg: Arg, thunkApi: ThunkApi) => Promise<Returned>
) => {
  return createAsyncThunk<Returned, Arg, Config>(
    type,
    async (arg, thunkApi) => {
      try {
        return await asyncFunction(arg, thunkApi);
      } catch (err: unknown) {
        const error = err as ErrorResponse;
        if (error.response) {
          return thunkApi.rejectWithValue({
            message: error.response.message || error.message,
          });
        }
        return thunkApi.rejectWithValue({
          message: error.message,
        });
      }
    }
  );
};
