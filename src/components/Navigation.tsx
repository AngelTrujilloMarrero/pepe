import React from 'react';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-black/10 backdrop-blur-[2px] p-2 rounded-full">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex justify-center items-center flex-wrap h-auto space-x-1 sm:space-x-2">
          <a href="#events" className="text-white hover:bg-white/20 font-semibold px-3 py-2 rounded-full transition-all duration-300">Eventos</a>
          <a href="#map" className="text-white hover:bg-white/20 font-semibold px-3 py-2 rounded-full transition-all duration-300">Mapa</a>
          <a href="#stats" className="text-white hover:bg-white/20 font-semibold px-3 py-2 rounded-full transition-all duration-300">Estadísticas</a>
          <a href="#analyzer" className="text-white hover:bg-white/20 font-semibold px-3 py-2 rounded-full transition-all duration-300">Total</a>
          <a href="#social" className="text-white hover:bg-white/20 font-semibold px-3 py-2 rounded-full transition-all duration-300">Redes</a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;