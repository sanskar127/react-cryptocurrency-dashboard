import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import debounce from '../../utils/debounce';

const initialState = {
  coins: [],
  trendingCoins: [],
  query: '',
};

export const fetchCoins = createAsyncThunk(
  'home/fetchCoins',
  async () => {
    const res = await axios.get('https://api.coingecko.com/api/v3/search/trending');
    
    return res.data.coins.map(coin => ({
      name: coin.item.name,
      image: coin.item.large,
      id: coin.item.id,
      priceBTC: coin.item.price_btc,
    }));
  }
);

export const searchCoins = createAsyncThunk(
  'home/searchCoins',
  debounce(async (query, { getState }) => {
    if (query.length > 2) {
      const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`);

      return res.data.coins.map(coin => ({
        name: coin.item.name,
        image: coin.item.large,
        id: coin.item.id,
        priceBTC: coin.item.price_btc,
      }));
    } else {
      return getState().home.trendingCoins;
    }
  }, 500)
);

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.coins = action.payload;
        state.trendingCoins = action.payload;
      })
      .addCase(searchCoins.fulfilled, (state, action) => {
        state.coins = action.payload;
      });
  },
});

export const { setQuery } = homeSlice.actions;

export default homeSlice.reducer;
