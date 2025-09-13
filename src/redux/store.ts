import { configureStore, type PayloadAction } from '@reduxjs/toolkit';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import brandsReducer from './brands/slice';
import carDetailsReducer from './carDetails/slice';
import carsReducer from './cars/slice';
import filtersReducer from './filters/slice';

const carsPersistConfig = {
  key: 'cars',
  storage,
  whitelist: ['favorites'],
};

const persistCarsReducer = persistReducer(carsPersistConfig, carsReducer);

export const store = configureStore({
  reducer: {
    brands: brandsReducer,
    carDetails: carDetailsReducer,
    cars: persistCarsReducer,
    filters: filtersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppAction<T> = PayloadAction<T>;
