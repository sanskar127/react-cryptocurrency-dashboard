import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPrices, setSearchTerm } from '../../store/reducers/cryptoSlice'
import { Link } from 'react-router-dom'

const ITEMS_PER_PAGE = 5

function Page() {
  const dispatch = useDispatch()
  const { prices, loading, error, searchTerm } = useSelector((state) => state.crypto)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    dispatch(fetchPrices())
  }, [dispatch])

  const filteredPrices = prices.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm?.toLowerCase() || '')
  )

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentPrices = filteredPrices.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const totalPages = Math.ceil(filteredPrices.length / ITEMS_PER_PAGE)

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

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
        <div className="crypto-container w-4/5 mt-10">
          <ul className="list-none">
            {currentPrices.map(coin => (
              <li key={coin.id} className="bg-gray-700 p-5 m-2 rounded-lg shadow-lg flex items-center">
                <img src={coin.image} alt={coin.name} className="w-10 h-10 mr-4"/>
                <div>
                  <h2 className="text-2xl">{coin.name} ({coin.symbol.toUpperCase()})</h2>
                  <p className="text-xl mt-2">${coin.current_price}</p>
                  <Link to={`/coin/${coin.id}`} className="text-blue-400 hover:underline">View Details</Link>
                </div>
              </li>
            ))}
          </ul>
          <div className="pagination mt-5 flex justify-between w-full">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="bg-blue-500 p-2 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="bg-blue-500 p-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Page
