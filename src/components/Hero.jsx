import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=1920&q=80" alt="Momos" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/60 to-dark" />
      </div>
      <div className="relative z-10 text-center px-4 animate-fade-in-up">
        <div className="text-6xl mb-4">🥟</div>
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          <span className="text-brand">3BS</span> MOMO
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-2">Dumplings Done Right</p>
        <p className="text-sm text-gray-400 mb-8">📍 Kitt Road, Bhubaneswar • ⏰ 4 PM – 10:30 PM</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#menu" className="bg-brand hover:bg-brand-dark px-8 py-3 rounded-full font-semibold text-lg transition-all hover:scale-105 shadow-lg shadow-brand/30">
            View Menu
          </a>
          <a href="https://wa.me/916370013996?text=Hi!%20I'd%20like%20to%20order%20from%203BS%20MOMO" target="_blank" rel="noopener noreferrer" className="border border-green-500 text-green-400 hover:bg-green-500/20 px-8 py-3 rounded-full font-semibold text-lg transition-all hover:scale-105">
            💬 WhatsApp Order
          </a>
        </div>
      </div>
      <a href="#menu" className="absolute bottom-8 z-10 animate-bounce">
        <ChevronDown className="w-8 h-8 text-brand" />
      </a>
    </section>
  );
}
