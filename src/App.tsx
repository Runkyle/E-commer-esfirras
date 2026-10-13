import React from 'react';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import AppRoutes from './routes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/Cart/CartDrawer';
import './App.css';

// Barra Flutuante de Sacola no Celular (Mobile-First)
const MobileFloatingCart: React.FC = () => {
  const { totalItems, totalPrice } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Não exibe a barra flutuante se o carrinho estiver vazio ou se o usuário já estiver na sacola/checkout/sucesso
  if (totalItems === 0 || ['/carrinho', '/checkout', '/sucesso'].includes(location.pathname)) {
    return null;
  }

  const formattedTotal = totalPrice.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <aside className="fixed bottom-4 left-4 right-4 z-40 sm:hidden">
      <button
        type="button"
        onClick={() => navigate('/carrinho')}
        className="w-full bg-orange-600 hover:bg-orange-700 active:scale-[0.98] text-white font-bold py-3.5 px-5 rounded-2xl shadow-xl flex items-center justify-between transition-all cursor-pointer"
        aria-label="Ver sacola de compras"
      >
        <div className="flex items-center gap-2.5">
          <span className="bg-orange-700/80 px-2.5 py-1 rounded-xl text-xs font-black flex items-center gap-1">
            🛒 {totalItems}
          </span>
          <span className="text-sm font-semibold">Ver Sacola</span>
        </div>
        <span className="text-base font-black tracking-wide">{formattedTotal}</span>
      </button>
    </aside>
  );
};

// Componente com o conteúdo da aplicação que consome hooks de rota
const AppContent: React.FC = () => {
  return (
    <div className="app-layout min-h-screen flex flex-col bg-stone-50/50 pb-20 sm:pb-0">
      {/* Barra de Navegação Global com Links */}
      <Navbar />

      {/* Roteamento das Páginas */}
      <main className="flex-grow">
        <AppRoutes />
      </main>

      {/* Barra Flutuante Mobile */}
      <MobileFloatingCart />

      {/* Gaveta do Carrinho (compatível com drawer rápido) */}
      <CartDrawer />

      {/* Rodapé Global */}
      <Footer />
    </div>
  );
};

// Componente Raiz com os Provedores Globais
export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
