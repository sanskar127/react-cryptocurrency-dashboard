import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the thunk (async action) to fetch trending data
export const fetchTrendingData = createAsyncThunk(
  'trending/fetchTrendingData',
  async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/search/trending');
      // return response.data.coins; // Assuming `coins` is the array you want to store
      const coins = response.data.coins;

      return coins.map(coin => {
        return {
          name: coin.item.name,
          image: coin.item.large,
          id: coin.item.id,
          priceBTC: coin.item.price_btc,
        }
      })


    } catch (error) {
      throw new Error('Failed to fetch trending data');
    }
  }
);

// Create the trending slice
const trendingSlice = createSlice({
  name: 'trending',
  initialState: {
    data: [],
    status: 'idle', // or 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    // You can add any additional reducers here if needed
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTrendingData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTrendingData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload; // Ensure `action.payload` matches the structure returned by the API
      })
      .addCase(fetchTrendingData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default trendingSlice.reducer;
