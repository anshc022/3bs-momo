import { HashRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import OrderTrack from './pages/OrderTrack';

export default function App() {
  return (
    <HashRouter>
      <CartProvider>
        <Navbar />
        <Cart />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/track/:orderId" element={<OrderTrack />} />
        </Routes>
      </CartProvider>
    </HashRouter>
  );
}
