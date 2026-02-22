import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, isOpen, setIsOpen, updateQty, removeItem, total, clearCart } = useCart();
  const navigate = useNavigate();

  const whatsappOrder = () => {
    const items = cart.map(i => `• ${i.name} (${i.pcs}) x${i.qty} = ₹${i.price * i.qty}`).join('\n');
    const msg = `🥟 *3BS MOMO Order*\n\n${items}\n\n*Total: ₹${total}*\n\nPlease confirm!`;
    window.open(`https://wa.me/916370013996?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      <div className="relative w-full max-w-md bg-dark-elevated h-full overflow-y-auto animate-fade-in-up shadow-2xl">
        <div className="sticky top-0 bg-dark-elevated border-b border-white/10 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-brand" /> Your Cart</h2>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full"><X className="w-5 h-5" /></button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
            <span className="text-6xl mb-4">🥟</span>
            <p className="text-lg">Your cart is empty</p>
            <p className="text-sm">Add some delicious momos!</p>
          </div>
        ) : (
          <>
            <div className="p-4 space-y-3">
              {cart.map(item => (
                <div key={item.id} className="bg-dark-card rounded-xl p-3 flex items-center gap-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item.pcs} • ₹{item.price} each</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="p-1 bg-white/5 rounded-full hover:bg-white/10"><Minus className="w-3 h-3" /></button>
                    <span className="text-sm font-bold w-5 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="p-1 bg-white/5 rounded-full hover:bg-white/10"><Plus className="w-3 h-3" /></button>
                  </div>
                  <span className="text-brand font-bold text-sm w-12 text-right">₹{item.price * item.qty}</span>
                  <button onClick={() => removeItem(item.id)} className="p-1 text-red-400 hover:bg-red-400/10 rounded-full"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
            <div className="sticky bottom-0 bg-dark-elevated border-t border-white/10 p-4 space-y-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span><span className="text-brand">₹{total}</span>
              </div>
              <button onClick={() => { setIsOpen(false); navigate('/checkout'); }} className="w-full bg-brand hover:bg-brand-dark py-3 rounded-full font-semibold transition-all hover:scale-[1.02] active:scale-95">
                Proceed to Checkout
              </button>
              <button onClick={whatsappOrder} className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-full font-semibold transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" /> Order via WhatsApp
              </button>
              <button onClick={clearCart} className="w-full text-gray-500 hover:text-red-400 text-sm transition py-1">Clear Cart</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
