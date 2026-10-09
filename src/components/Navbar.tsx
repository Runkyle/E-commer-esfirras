import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const { totalItems, totalPrice } = useCart();
  const location = useLocation();

  const formattedTotal = totalPrice.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs px-4 sm:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logotipo / Marca */}
        <Link to="/" className="flex items-center gap-3 text-decoration-none group">
          <span className="text-3xl transition-transform group-hover:scale-110">
            <img className='w-[80px] h-[80px] object-cover rounded-lg' src="/imagens-icons/logo-menor.jpeg" alt="logo"  />
          </span>
          <div className="flex flex-col text-left">
            <span className="text-xl sm:text-2xl font-black text-orange-600 tracking-tight leading-tight">
              Sheik's Esfirra
            </span>
            <span className="text-[11px] text-gray-500 font-medium hidden sm:inline">
              Forno a Lenha & Massa Artesanal
            </span>
          </div>
        </Link>

        {/* Links de Navegação */}
        <div className="flex items-center gap-2 sm:gap-6">
          <div className="hidden md:flex items-center gap-4 text-sm font-bold">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/') ? 'text-orange-600 bg-orange-50' : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              Início
            </Link>
            <Link
              to="/cardapio"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/cardapio') ? 'text-orange-600 bg-orange-50' : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              Cardápio
            </Link>
          </div>

          {/* Botão para o Carrinho */}
          <Link
            to="/carrinho"
            className="flex items-center gap-2 bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-800 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
            aria-label="Ver carrinho de compras"
          >
            <span className="text-base sm:text-lg">🛒</span>
            <span className="text-gray-700 hidden sm:inline">
              Sacola: <strong className="text-orange-600 font-bold">{totalItems}</strong>
            </span>
            {totalItems > 0 && (
              <span className="bg-orange-600 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full">
                {formattedTotal}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

