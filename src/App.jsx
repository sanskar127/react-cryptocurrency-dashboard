import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPrices } from './store/reducers/cryptoSlice';

function App() {
  const dispatch = useDispatch();
  const { prices, loading, error } = useSelector((state) => state.crypto);

  useEffect(() => {
    dispatch(fetchPrices());
  }, [dispatch]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10">Error fetching data</div>;

  return (
    <div className="App">
      <header className="App-header bg-gray-800 min-h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold">Crypto Price App</h1>
        <div className="crypto-container flex justify-around w-4/5 mt-10">
          <div className="crypto bg-gray-700 p-5 rounded-lg shadow-lg min-w-40">
            <h2 className="text-2xl">Bitcoin (BTC)</h2>
            <p className="text-xl mt-2">${prices.bitcoin?.usd ?? 'N/A'}</p>
          </div>
          <div className="crypto bg-gray-700 p-5 rounded-lg shadow-lg min-w-40">
            <h2 className="text-2xl">Ethereum (ETH)</h2>
            <p className="text-xl mt-2">${prices.ethereum?.usd ?? 'N/A'}</p>
          </div>
          <div className="crypto bg-gray-700 p-5 rounded-lg shadow-lg min-w-40">
            <h2 className="text-2xl">Ripple (XRP)</h2>
            <p className="text-xl mt-2">${prices.ripple?.usd ?? 'N/A'}</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
