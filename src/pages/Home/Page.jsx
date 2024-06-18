import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrendingData } from '../../store/reducers/trendingSlice';

const Page = () => {
  const dispatch = useDispatch();
  const trendingData = useSelector(state => state.trending.data);
  const status = useSelector(state => state.trending.status);
  const error = useSelector(state => state.trending.error);

  useEffect(() => {
    dispatch(fetchTrendingData());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  console.log(trendingData)

  return (
    <div>
      <h2>Trending Coins</h2>
      <ul>
        {trendingData.map(coin => (
          <li key={coin.id}>
            {coin.name} - {coin.priceBTC}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
