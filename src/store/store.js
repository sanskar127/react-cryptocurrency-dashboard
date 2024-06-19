import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from './reducers/cryptoSlice';

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
});
