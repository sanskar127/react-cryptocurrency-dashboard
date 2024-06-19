import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home/Page'
import CoinPage from './pages/Coin/Page'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/coin/:coinId" element={<CoinPage />} />
    </Routes>
  )
}

export default App;
