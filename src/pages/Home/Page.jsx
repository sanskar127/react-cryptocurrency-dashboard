import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPrices, setSearchTerm } from '../../store/reducers/cryptoSlice'
import { Link } from 'react-router-dom'

function Page() {
  const dispatch = useDispatch()
  const { prices, loading, error, searchTerm } = useSelector((state) => state.crypto)

  useEffect(() => {
    dispatch(fetchPrices())
  }, [dispatch])

  const filteredPrices = prices.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm?.toLowerCase() || '')
  )

  if (loading) return <div className="text-center mt-10">Loading...</div>
  if (error) return <div className="text-center mt-10">Error fetching data</div>

  return (
    <div className="App">
      <header className="App-header bg-gray-800 min-h-screen flex flex-col items-center text-white">
        <h1 className="text-4xl font-bold">Crypto Price App</h1>
        <input
          type="text"
          placeholder="Search..."
          className="mt-5 p-2 rounded"
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
        <div className="crypto-container flex flex-wrap justify-around w-4/5 mt-10">
          {filteredPrices.map(coin => (
            <div key={coin.id} className="crypto bg-gray-700 p-5 m-2 rounded-lg shadow-lg min-w-40">
              <h2 className="text-2xl">{coin.name} ({coin.symbol.toUpperCase()})</h2>
              <p className="text-xl mt-2">${coin.current_price}</p>
              <Link to={`/coin/${coin.id}`} className="text-blue-400 hover:underline">View Details</Link>
            </div>
          ))}
        </div>
      </header>
    </div>
  )
}

export default Page
