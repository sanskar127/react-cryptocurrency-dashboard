import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setQuery, fetchCoins, searchCoins } from '../../store/reducers/homeSlice';

function Page() {
  const dispatch = useDispatch();
  const { coins, query } = useSelector(state => state.home); // trendingCoins

  const handleInputChange = (e) => {
    dispatch(setQuery(e.target.value));
    if (e.target.value.length > 2) {
      dispatch(searchCoins(e.target.value));
    } else {
      dispatch(fetchCoins());
    }
  };

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  return (
    <div>
      <input type="text" value={query} onChange={handleInputChange} />
      <ul>
        {coins.map(coin => (
          <li key={coin.id}>
            <img src={coin.image} alt={coin.name} />
            {coin.name} - Price BTC: {coin.priceBTC}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Page;
