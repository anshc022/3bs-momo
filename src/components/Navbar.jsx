import { ShoppingCart, MapPin, Clock, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { itemCount, setIsOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-3xl">🥟</span>
          <div>
            <h1 className="text-xl font-bold text-brand">3BS MOMO</h1>
            <p className="text-[10px] text-gray-400 -mt-1">Dumplings Done Right</p>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-300">
          <a href={location.pathname === '/' ? '#menu' : '/#menu'} className="hover:text-brand transition">Menu</a>
          <a href={location.pathname === '/' ? '#location' : '/#location'} className="hover:text-brand transition">Location</a>
          <a href={location.pathname === '/' ? '#contact' : '/#contact'} className="hover:text-brand transition">Contact</a>
        </div>
        <button onClick={() => setIsOpen(true)} className="relative p-2 hover:bg-white/10 rounded-full transition">
          <ShoppingCart className="w-6 h-6" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-brand text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse-glow">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
