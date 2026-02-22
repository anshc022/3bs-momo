import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { menuData } from '../data/menu';
import { useCart } from '../context/CartContext';

function MenuItem({ item }) {
  const { cart, addItem, updateQty } = useCart();
  const inCart = cart.find(i => i.id === item.id);
  const discount = Math.round(((item.was - item.price) / item.was) * 100);

  return (
    <div className="bg-dark-card border border-white/5 rounded-2xl p-4 hover:border-brand/30 transition-all group">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-white group-hover:text-brand transition">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.pcs} • Full Plate</p>
        </div>
        <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full font-medium">{discount}% OFF</span>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-brand">₹{item.price}</span>
          <span className="text-sm text-gray-500 line-through">₹{item.was}</span>
        </div>
        {inCart ? (
          <div className="flex items-center gap-2 bg-brand/20 rounded-full px-1">
            <button onClick={() => updateQty(item.id, inCart.qty - 1)} className="p-1 hover:bg-brand/30 rounded-full transition"><Minus className="w-4 h-4 text-brand" /></button>
            <span className="text-sm font-bold w-5 text-center">{inCart.qty}</span>
            <button onClick={() => addItem(item)} className="p-1 hover:bg-brand/30 rounded-full transition"><Plus className="w-4 h-4 text-brand" /></button>
          </div>
        ) : (
          <button onClick={() => addItem(item)} className="bg-brand hover:bg-brand-dark text-white px-4 py-1.5 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95">
            ADD
          </button>
        )}
      </div>
    </div>
  );
}

export default function Menu() {
  const [active, setActive] = useState('Steam');

  return (
    <section id="menu" className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Our <span className="text-brand">Menu</span></h2>
        <p className="text-gray-400">Fresh, hot, and loaded with flavor</p>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
        {menuData.map(cat => (
          <button key={cat.category} onClick={() => setActive(cat.category)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${active === cat.category ? 'bg-brand text-white shadow-lg shadow-brand/30' : 'bg-dark-elevated text-gray-400 hover:text-white'}`}>
            {cat.icon} {cat.category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in-up">
        {menuData.find(c => c.category === active)?.items.map(item => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
