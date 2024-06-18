import { BrowserRouter, Route, Routes } from "react-router-dom" 
import Home from "./pages/Home/Page"
import Show from "./pages/Home/Show"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={ <Home/> } />
        <Route path="/:id" element={ <Show /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
