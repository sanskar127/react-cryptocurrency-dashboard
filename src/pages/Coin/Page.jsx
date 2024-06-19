import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCoinDetails } from '../../store/reducers/cryptoSlice'
import { useParams, Link } from 'react-router-dom'

function Page() {
  const { coinId } = useParams()
  const dispatch = useDispatch()
  const { coinDetails, loading, error } = useSelector((state) => state.crypto)

  useEffect(() => {
    dispatch(fetchCoinDetails(coinId))
  }, [dispatch, coinId])

  if (loading) return <div className="text-center mt-10">Loading...</div>
  if (error) return <div className="text-center mt-10">Error fetching data</div>
  if (!coinDetails.id) return <div className="text-center mt-10">Coin not found</div>

  return (
    <div className="App">
      <header className="App-header bg-gray-800 min-h-screen flex flex-col items-center text-white">
        <div className="coin-details bg-gray-700 p-10 rounded-lg shadow-lg w-4/5 mt-10">
          <div className="flex items-center">
            <img src={coinDetails.image.large} alt={coinDetails.name} className="w-20 h-20 mr-4"/>
            <h1 className="text-4xl font-bold">{coinDetails.name} ({coinDetails.symbol.toUpperCase()})</h1>
          </div>
          <p className="text-2xl mt-5">${coinDetails.market_data.current_price.usd.toFixed(2)}</p>
          <p className="text-xl mt-2">Market Cap: ${coinDetails.market_data.market_cap.usd.toLocaleString()}</p>
          <p className="text-xl mt-2">Total Volume: ${coinDetails.market_data.total_volume.usd.toLocaleString()}</p>
          <p className="text-xl mt-2">24h Change: {coinDetails.market_data.price_change_percentage_24h.toFixed(2)}%</p>
          <p className="text-xl mt-2">All Time High: ${coinDetails.market_data.ath.usd.toFixed(2)}</p>
          <p className="text-xl mt-2">All Time Low: ${coinDetails.market_data.atl.usd.toFixed(2)}</p>
          <div className="mt-5">
            <Link to="/" className="text-blue-400 hover:underline">Back to Home</Link>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Page
