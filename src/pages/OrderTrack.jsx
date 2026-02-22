import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CheckCircle, Clock, ChefHat, Truck, Package } from 'lucide-react';

const steps = [
  { label: 'Order Placed', icon: CheckCircle, delay: 0 },
  { label: 'Preparing', icon: ChefHat, delay: 10000 },
  { label: 'Out for Delivery', icon: Truck, delay: 25000 },
  { label: 'Delivered', icon: Package, delay: 40000 },
];

export default function OrderTrack() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('3bs-orders') || '[]');
    const found = orders.find(o => o.id === orderId);
    if (found) {
      setOrder(found);
      setStatus(found.status);
    }
  }, [orderId]);

  useEffect(() => {
    if (!order) return;
    const timers = steps.slice(1).map((step, i) =>
      setTimeout(() => {
        setStatus(i + 1);
        const orders = JSON.parse(localStorage.getItem('3bs-orders') || '[]');
        const idx = orders.findIndex(o => o.id === orderId);
        if (idx >= 0) { orders[idx].status = i + 1; localStorage.setItem('3bs-orders', JSON.stringify(orders)); }
      }, step.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [order, orderId]);

  if (!order) return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20">
      <span className="text-6xl mb-4">🔍</span>
      <h2 className="text-2xl font-bold mb-2">Order not found</h2>
      <button onClick={() => navigate('/')} className="mt-4 bg-brand px-6 py-2 rounded-full">Go Home</button>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-10 px-4 max-w-lg mx-auto">
      <div className="text-center mb-8">
        <span className="text-5xl mb-4 block">{status === 3 ? '🎉' : '🥟'}</span>
        <h2 className="text-2xl font-bold mb-1">{status === 3 ? 'Order Delivered!' : 'Tracking Order'}</h2>
        <p className="text-brand font-mono text-lg">#{order.id}</p>
      </div>

      <div className="relative mb-10">
        {/* Progress bar */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/10" />
        <div className="absolute left-6 top-0 w-0.5 bg-brand transition-all duration-1000" style={{ height: `${(status / (steps.length - 1)) * 100}%` }} />

        <div className="space-y-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const done = i <= status;
            const active = i === status;
            return (
              <div key={i} className="flex items-center gap-4 relative">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-all duration-500 ${done ? 'bg-brand shadow-lg shadow-brand/30' : 'bg-dark-card border border-white/10'} ${active ? 'scale-110 animate-pulse-glow' : ''}`}>
                  <Icon className={`w-5 h-5 ${done ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <div>
                  <p className={`font-semibold ${done ? 'text-white' : 'text-gray-600'}`}>{step.label}</p>
                  {active && i < 3 && <p className="text-xs text-brand animate-pulse">In progress...</p>}
                  {done && !active && <p className="text-xs text-green-400">✓ Complete</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-dark-card rounded-2xl p-4 border border-white/5">
        <h3 className="font-semibold mb-3 text-brand">Order Details</h3>
        {order.items.map(item => (
          <div key={item.id} className="flex justify-between text-sm py-1.5 border-b border-white/5 last:border-0">
            <span>{item.name} x{item.qty}</span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold mt-3 pt-3 border-t border-white/10">
          <span>Total</span><span className="text-brand">₹{order.total}</span>
        </div>
      </div>

      <button onClick={() => navigate('/')} className="w-full mt-6 border border-white/10 py-3 rounded-full hover:bg-white/5 transition">
        Back to Menu
      </button>
    </div>
  );
}
