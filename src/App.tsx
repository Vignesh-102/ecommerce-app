import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProductList from './components/Product list/ProductList'
import Layout from './layout/Layout'
import Home from './pages/Home/Home'
import Cart from './components/Cart/Cart'
import ProductDetail from './pages/Product details/ProductDetail'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="product/:id" element={<ProductDetail />} />
      </Route>

    </Routes>
  )
}

export default App
