import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPrices = createAsyncThunk('crypto/fetchPrices', async () => {
  const response = await axios.get(
    'https://api.coingecko.com/api/v3/coins/markets',
    {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: false
      }
    }
  )
  return response.data
})

export const fetchCoinDetails = createAsyncThunk('crypto/fetchCoinDetails', async (coinId) => {
  const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`)
  return response.data
})

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    prices: [],
    coinDetails: {},
    loading: false,
    error: null,
  },
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrices.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPrices.fulfilled, (state, action) => {
        state.prices = action.payload
        state.loading = false
      })
      .addCase(fetchPrices.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(fetchCoinDetails.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCoinDetails.fulfilled, (state, action) => {
        state.coinDetails = action.payload
        state.loading = false
      })
      .addCase(fetchCoinDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { setSearchTerm } = cryptoSlice.actions
export default cryptoSlice.reducer
