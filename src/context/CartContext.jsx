import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('3bs-cart')) || []; } catch { return []; }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => { localStorage.setItem('3bs-cart', JSON.stringify(cart)); }, [cart]);

  const addItem = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeItem = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty = (id, qty) => {
    if (qty <= 0) return removeItem(id);
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };
  const clearCart = () => setCart([]);
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const itemCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQty, clearCart, total, itemCount, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  );
}
