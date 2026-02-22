import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', address: '', notes: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderId = 'MO' + Date.now().toString(36).toUpperCase();
    const order = { id: orderId, items: [...cart], total, customer: { ...form }, status: 0, createdAt: Date.now() };
    const orders = JSON.parse(localStorage.getItem('3bs-orders') || '[]');
    orders.push(order);
    localStorage.setItem('3bs-orders', JSON.stringify(orders));
    clearCart();
    navigate(`/track/${orderId}`);
  };

  const whatsappCheckout = () => {
    const items = cart.map(i => `• ${i.name} (${i.pcs}) x${i.qty} = ₹${i.price * i.qty}`).join('\n');
    const msg = `🥟 *3BS MOMO Order*\n\n${items}\n\n*Total: ₹${total}*\n\n👤 ${form.name}\n📱 ${form.phone}\n📍 ${form.address}${form.notes ? '\n📝 ' + form.notes : ''}`;
    window.open(`https://wa.me/916370013996?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (cart.length === 0) return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-4">
      <span className="text-6xl mb-4">🥟</span>
      <h2 className="text-2xl font-bold mb-2">Cart is empty</h2>
      <button onClick={() => navigate('/')} className="mt-4 bg-brand px-6 py-2 rounded-full">Back to Menu</button>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-10 px-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <div className="bg-dark-card rounded-2xl p-4 mb-6 border border-white/5">
        <h3 className="font-semibold mb-3 text-brand">Order Summary</h3>
        {cart.map(item => (
          <div key={item.id} className="flex justify-between text-sm py-1.5 border-b border-white/5 last:border-0">
            <span>{item.name} ({item.pcs}) x{item.qty}</span>
            <span className="text-brand font-medium">₹{item.price * item.qty}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t border-white/10">
          <span>Total</span><span className="text-brand">₹{total}</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input required placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-dark-card border border-white/10 rounded-xl px-4 py-3 focus:border-brand focus:outline-none transition" />
        <input required placeholder="Phone Number" type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full bg-dark-card border border-white/10 rounded-xl px-4 py-3 focus:border-brand focus:outline-none transition" />
        <input required placeholder="Delivery Address" value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="w-full bg-dark-card border border-white/10 rounded-xl px-4 py-3 focus:border-brand focus:outline-none transition" />
        <textarea placeholder="Special instructions (optional)" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} className="w-full bg-dark-card border border-white/10 rounded-xl px-4 py-3 focus:border-brand focus:outline-none transition resize-none h-20" />
        <button type="submit" className="w-full bg-brand hover:bg-brand-dark py-3 rounded-full font-semibold text-lg transition-all hover:scale-[1.02] active:scale-95">
          Place Order
        </button>
        <button type="button" onClick={whatsappCheckout} className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-full font-semibold transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
          <MessageCircle className="w-5 h-5" /> Order via WhatsApp
        </button>
      </form>
    </div>
  );
}
