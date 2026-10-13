import React, { useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import './CartDrawer.css';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isCartOpen,
    closeCart,
    openCheckout,
  } = useCart();

  // Fecha o drawer ao apertar a tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Trava a rolagem do body quando o carrinho estiver aberto
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  // Formatação de moeda BRL
  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div
      className={`cart-overlay ${isCartOpen ? 'open' : ''} fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex justify-end`}
      onClick={closeCart}
      role="dialog"
      aria-modal="true"
      aria-label="Carrinho de Compras"
    >
      <div
        className="cart-drawer w-full sm:max-w-md h-full bg-white flex flex-col shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="cart-header p-4 sm:p-5 flex items-center justify-between border-b border-gray-100 bg-gray-50/70">
          <div className="cart-header-title flex items-center gap-2.5">
            <h3 className="text-lg font-extrabold text-gray-900 m-0">Sua Sacola</h3>
            <span className="cart-count-badge bg-orange-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
              {totalItems} {totalItems === 1 ? 'item' : 'itens'}
            </span>
          </div>
          <button
            type="button"
            className="cart-close-btn text-gray-400 hover:text-gray-800 p-1.5 rounded-lg hover:bg-gray-100 text-xl leading-none transition-all cursor-pointer"
            onClick={closeCart}
            aria-label="Fechar carrinho"
          >
            ✕
          </button>
        </div>

        {/* Lista de Itens ou Estado Vazio */}
        {cart.length === 0 ? (
          <div className="cart-empty flex-grow flex flex-col items-center justify-center p-6 text-center">
            <span className="cart-empty-icon text-5xl mb-3 opacity-75">🛒</span>
            <h4 className="text-lg font-bold text-gray-800 mb-1">Sua sacola está vazia</h4>
            <p className="text-sm text-gray-500 max-w-xs mb-6">
              Escolha deliciosas esfirras no cardápio e adicione ao seu pedido!
            </p>
            <button
              type="button"
              className="btn-start-shopping bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-orange-600/25 active:scale-95 cursor-pointer"
              onClick={closeCart}
            >
              Ver Cardápio
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-list flex-grow overflow-y-auto p-4 sm:p-5 flex flex-col gap-3">
              {cart.map((item) => {
                const name = item.name || item.nome;
                const unitPrice = item.price || item.preco || 0;
                const subtotal = unitPrice * item.quantity;
                const image = item.image || item.imagem;

                return (
                  <div
                    key={item.id}
                    className="cart-item flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-xs"
                  >
                    <img
                      src={image}
                      alt={name}
                      className="cart-item-image w-16 h-16 rounded-lg object-cover bg-gray-100 shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1777315387661-42a289edccba?auto=format&fit=crop&w=150&q=80';
                      }}
                    />

                    <div className="cart-item-info flex-grow min-w-0">
                      <h4 className="cart-item-name text-sm font-bold text-gray-900 truncate m-0">
                        {name}
                      </h4>
                      <span className="cart-item-unit-price text-xs text-gray-400">
                        {formatCurrency(unitPrice)} cada
                      </span>

                      <div className="cart-item-controls flex items-center justify-between mt-2">
                        {/* Controles de Quantidade (+ / -) */}
                        <div className="qty-control inline-flex items-center border border-gray-200 rounded-lg bg-gray-50">
                          <button
                            type="button"
                            className="qty-btn w-7 h-7 flex items-center justify-center text-gray-700 font-bold hover:bg-gray-200 text-sm transition-colors cursor-pointer"
                            onClick={() => decreaseQuantity(item.id)}
                            title="Diminuir quantidade"
                            aria-label={`Diminuir quantidade de ${name}`}
                          >
                            −
                          </button>
                          <span className="qty-value w-7 text-center text-xs font-bold text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="qty-btn w-7 h-7 flex items-center justify-center text-gray-700 font-bold hover:bg-gray-200 text-sm transition-colors cursor-pointer"
                            onClick={() => increaseQuantity(item.id)}
                            title="Aumentar quantidade"
                            aria-label={`Aumentar quantidade de ${name}`}
                          >
                            +
                          </button>
                        </div>

                        {/* Subtotal do Item */}
                        <span className="cart-item-subtotal text-sm font-extrabold text-orange-600">
                          {formatCurrency(subtotal)}
                        </span>
                      </div>
                    </div>

                    {/* Botão de Remover */}
                    <button
                      type="button"
                      className="cart-remove-btn text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors cursor-pointer shrink-0"
                      onClick={() => removeFromCart(item.id)}
                      title="Remover produto"
                      aria-label={`Remover ${name} da sacola`}
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Rodapé com Cálculo Automático e Avanço */}
            <div className="cart-footer p-4 sm:p-5 border-t border-gray-100 bg-gray-50/70 flex flex-col gap-3">
              <div className="cart-summary-row flex justify-between text-xs sm:text-sm text-gray-500">
                <span>Quantidade de itens:</span>
                <strong className="text-gray-800">{totalItems} {totalItems === 1 ? 'item' : 'itens'}</strong>
              </div>

              <div className="cart-summary-row total flex justify-between items-center pt-2 border-t border-dashed border-gray-200">
                <span className="text-base font-bold text-gray-800">Total a Pagar:</span>
                <span className="total-amount text-xl font-black text-orange-600">{formatCurrency(totalPrice)}</span>
              </div>

              <div className="cart-actions flex flex-col gap-2 mt-2">
                <button
                  type="button"
                  className="btn-checkout w-full bg-orange-600 hover:bg-orange-700 text-white py-3.5 px-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-orange-600/25 active:scale-98 transition-all cursor-pointer"
                  onClick={openCheckout}
                >
                  <span>Avançar para o Checkout</span>
                  <span>➜</span>
                </button>

                <button
                  type="button"
                  className="btn-clear-cart text-xs text-gray-400 hover:text-red-500 hover:bg-red-50 py-2 rounded-lg transition-colors cursor-pointer"
                  onClick={() => {
                    if (window.confirm('Deseja realmente esvaziar a sacola?')) {
                      clearCart();
                    }
                  }}
                >
                  Esvaziar Sacola
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
