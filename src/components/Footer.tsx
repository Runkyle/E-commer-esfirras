import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 px-4 text-center text-gray-500 text-xs mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🥟</span>
          <span className="font-bold text-gray-800 text-sm">Sheik's Esfirra</span>
        </div>

        <div className="flex gap-6 font-medium">
          <Link to="/" className="hover:text-orange-600 transition-colors">Início</Link>
          <Link to="/cardapio" className="hover:text-orange-600 transition-colors">Cardápio</Link>
          <Link to="/carrinho" className="hover:text-orange-600 transition-colors">Carrinho</Link>
        </div>

        <p className="m-0 text-gray-400">
          © {new Date().getFullYear()} Sheik's Esfirra — Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

