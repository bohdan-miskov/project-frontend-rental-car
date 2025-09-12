import {
  createAsyncThunk,
  type AsyncThunk,
  type AsyncThunkPayloadCreator,
  type AsyncThunkConfig,
} from '@reduxjs/toolkit';
import type { ErrorResponse } from '../../types/error';

type RejectValue = {
  message: string;
};

export function wrapAsyncThunk<Returned, Arg = void>(
  type: string,
  asyncFunction: AsyncThunkPayloadCreator<
    Returned,
    Arg,
    AsyncThunkConfig & { rejectValue: RejectValue }
  >
): AsyncThunk<Returned, Arg, AsyncThunkConfig & { rejectValue: RejectValue }> {
  return createAsyncThunk<
    Returned,
    Arg,
    AsyncThunkConfig & { rejectValue: RejectValue }
  >(type, async (arg, thunkApi) => {
    try {
      return await asyncFunction(arg, thunkApi);
    } catch (err: ErrorResponse) {
      if (err?.response) {
        return thunkApi.rejectWithValue({
          message: err.response.message ?? err.message,
        });
      }

      return thunkApi.rejectWithValue({
        message: err.message,
      });
    }
  });
}
