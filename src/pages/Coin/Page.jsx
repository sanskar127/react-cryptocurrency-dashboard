import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPrices } from '../../store/reducers/cryptoSlice'
import { useParams, Link } from 'react-router-dom'

function Page() {
  const { coinId } = useParams()
  const dispatch = useDispatch()
  const { prices, loading, error } = useSelector((state) => state.crypto)
  const coin = prices.find(c => c.id === coinId)

  useEffect(() => {
    if (!prices.length) {
      dispatch(fetchPrices())
    }
  }, [dispatch, prices])

  if (loading) return <div className="text-center mt-10">Loading...</div>
  if (error) return <div className="text-center mt-10">Error fetching data</div>
  if (!coin) return <div className="text-center mt-10">Coin not found</div>

  return (
    <div className="App">
      <header className="App-header bg-gray-800 min-h-screen flex flex-col items-center text-white">
        <h1 className="text-4xl font-bold">{coin.name} ({coin.symbol.toUpperCase()})</h1>
        <p className="text-2xl mt-5">${coin.current_price}</p>
        <Link to="/" className="text-blue-400 hover:underline mt-5">Back to Home</Link>
      </header>
    </div>
  )
}

export default Page
