import { configureStore } from '@reduxjs/toolkit';
import trendingReducer from './reducers/trendingSlice';

export const store = configureStore({
  reducer: {
    trending: trendingReducer,
  },
});
