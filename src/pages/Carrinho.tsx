import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Carrinho: React.FC = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div className="carrinho-page max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-8 text-left">
        <div>
          <span className="text-xs text-orange-600 font-extrabold uppercase tracking-wider">
            Resumo do Pedido
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-gray-900 mt-1">
            Sua Sacola de Compras
          </h1>
        </div>

        {cart.length > 0 && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Tem certeza que deseja esvaziar sua sacola?')) {
                clearCart();
              }
            }}
            className="self-start sm:self-auto text-xs text-gray-400 hover:text-red-500 font-semibold transition-colors cursor-pointer"
          >
            Esvaziar Sacola
          </button>
        )}
      </div>

      {/* Conteúdo do Carrinho */}
      {cart.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center flex flex-col items-center gap-4 shadow-xs">
          <span className="text-6xl mb-2">🛒</span>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">Sua sacola está vazia</h2>
          <p className="text-sm text-gray-500 max-w-sm">
            Você ainda não adicionou nenhuma esfiha à sua sacola. Dá uma olhada no nosso cardápio!
          </p>
          <Link
            to="/cardapio"
            className="mt-2 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-orange-600/25 active:scale-95"
          >
            Explorar Cardápio 🥟
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
          {/* Lista de Itens (2 Colunas no desktop) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {cart.map((item) => {
              const name = item.name || item.nome;
              const unitPrice = item.price || item.preco || 0;
              const subtotal = unitPrice * item.quantity;
              const image = item.image || item.imagem;

              return (
                <div
                  key={item.id}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4 transition-all hover:border-gray-200"
                >
                  <img
                    src={image}
                    alt={name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover bg-gray-50 shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1777315387661-42a289edccba?auto=format&fit=crop&w=200&q=80';
                    }}
                  />

                  <div className="flex flex-col flex-grow min-w-0 gap-1">
                    <h3 className="font-extrabold text-gray-900 text-sm sm:text-base truncate">
                      {name}
                    </h3>
                    <span className="text-xs text-gray-400">
                      {formatCurrency(unitPrice)} un.
                    </span>

                    <div className="flex items-center justify-between mt-2">
                      {/* Controles de Quantidade */}
                      <div className="inline-flex items-center border border-gray-200 rounded-lg bg-gray-50">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200 text-sm transition-colors cursor-pointer"
                          aria-label={`Diminuir ${name}`}
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-xs font-black text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200 text-sm transition-colors cursor-pointer"
                          aria-label={`Aumentar ${name}`}
                        >
                          +
                        </button>
                      </div>

                      {/* Subtotal */}
                      <span className="text-base sm:text-lg font-black text-orange-600">
                        {formatCurrency(subtotal)}
                      </span>
                    </div>
                  </div>

                  {/* Botão de Remover */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-colors cursor-pointer self-start"
                    title="Remover item"
                    aria-label={`Remover ${name}`}
                  >
                    🗑️
                  </button>
                </div>
              );
            })}

            <Link
              to="/cardapio"
              className="self-start text-xs sm:text-sm text-orange-600 font-bold hover:underline flex items-center gap-1.5 mt-2"
            >
              ← Adicionar mais esfihas
            </Link>
          </div>

          {/* Resumo e Botão de Checkout (1 Coluna no desktop) */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-5 sticky top-24">
              <h2 className="text-lg font-black text-gray-900 border-b border-gray-100 pb-3">
                Resumo dos Valores
              </h2>

              <div className="flex flex-col gap-2.5 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Itens selecionados</span>
                  <strong className="text-gray-800">{totalItems}</strong>
                </div>

                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-800">{formatCurrency(totalPrice)}</span>
                </div>

                <div className="flex justify-between text-gray-500">
                  <span>Entrega estimada</span>
                  <span className="text-xs text-gray-400">Calculada no checkout</span>
                </div>

                <div className="flex justify-between items-center text-lg font-black text-gray-900 pt-3 border-t border-dashed border-gray-200">
                  <span>Total</span>
                  <span className="text-xl font-black text-orange-600">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-extrabold py-4 px-6 rounded-2xl shadow-xl shadow-orange-600/30 transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer text-base"
              >
                <span>Avançar para o Checkout</span>
                <span>➜</span>
              </button>

              <p className="text-[11px] text-gray-400 text-center m-0">
                🔒 Envio direto para o WhatsApp oficial da loja
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrinho;

