import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export const Home: React.FC = () => {
  const { addToCart } = useCart();

  // Seleciona as 3 esfihas mais populares para os destaques
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="home-page flex flex-col gap-12 sm:gap-20 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/80 via-white to-white py-12 sm:py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col gap-6 text-left">
            <span className="inline-flex items-center gap-2 self-start bg-orange-100 text-orange-800 text-xs sm:text-sm font-extrabold px-3.5 py-1.5 rounded-full border border-orange-200">
              🔥 Assadas no Forno a Lenha
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.15]">
              O autêntico sabor das <span className="text-orange-600">esfihas árabes</span> quentinhas na sua casa.
            </h1>

            <p className="text-gray-600 text-sm sm:text-lg leading-relaxed max-w-xl">
              Massa artesanal fininha e macia, recheios generosos e temperos tradicionais selecionados. Peça pelo celular e receba direto no seu endereço!
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/cardapio"
                className="bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-black text-base sm:text-lg px-8 py-4 rounded-2xl shadow-xl shadow-orange-600/30 transition-all flex items-center gap-2"
              >
                <span>Ver Cardápio Completo</span>
                <span>➜</span>
              </Link>
              <Link
                to="/carrinho"
                className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-bold text-sm sm:text-base px-6 py-4 rounded-2xl transition-all"
              >
                Ver Minha Sacola
              </Link>
            </div>

            {/* Badges de confiança */}
            <div className="flex items-center gap-6 pt-4 border-t border-gray-100 text-xs sm:text-sm text-gray-500 font-medium">
              <span className="flex items-center gap-1.5">⭐ <strong>4.9</strong> (1.200+ avaliações)</span>
              <span className="flex items-center gap-1.5">🛵 <strong>30-45 min</strong> entrega média</span>
            </div>
          </div>

          {/* Imagem do Hero */}
          <div className="relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80"
                alt="Esfihas quentinhas da Esfiharia Express"
                className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Card flutuante sobre a imagem */}
            <div className="absolute -bottom-6 -left-4 sm:left-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3">
              <span className="text-3xl">👨‍🍳</span>
              <div className="text-left">
                <p className="text-xs font-bold text-gray-400 uppercase">Receita Secreta</p>
                <p className="text-sm font-extrabold text-gray-800 m-0">100% Artesanal e Fresco</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Nossos Diferenciais */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Por que escolher a Esfiharia Express?</h2>
          <p className="text-sm text-gray-500 mt-2">Tradição e cuidado em cada detalhe do seu pedido.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col items-center text-center gap-3">
            <span className="text-4xl">🪵</span>
            <h3 className="font-bold text-gray-900 text-lg">Forno a Lenha</h3>
            <p className="text-xs sm:text-sm text-gray-500">Massa crocante por fora e macia por dentro assada no ponto ideal.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col items-center text-center gap-3">
            <span className="text-4xl">🥩</span>
            <h3 className="font-bold text-gray-900 text-lg">Ingredientes Selecionados</h3>
            <p className="text-xs sm:text-sm text-gray-500">Carnes de primeira, queijos de verdade e temperos frescos importados.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col items-center text-center gap-3">
            <span className="text-4xl">🛵</span>
            <h3 className="font-bold text-gray-900 text-lg">Entrega Quentinha</h3>
            <p className="text-xs sm:text-sm text-gray-500">Embalagens térmicas especiais para você receber a comida como se estivesse no salão.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col items-center text-center gap-3">
            <span className="text-4xl">📱</span>
            <h3 className="font-bold text-gray-900 text-lg">Pedido Fácil no WhatsApp</h3>
            <p className="text-xs sm:text-sm text-gray-500">Escolha seus sabores, confirme no WhatsApp e acompanhe seu pedido.</p>
          </div>
        </div>
      </section>

      {/* 3. Destaques Mais Pedidos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="text-left">
            <span className="text-xs font-extrabold uppercase tracking-widest text-orange-600">Mais Populares</span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Os Favoritos da Casa</h2>
          </div>
          <Link
            to="/cardapio"
            className="text-orange-600 hover:text-orange-700 font-bold text-sm flex items-center gap-1"
          >
            Ver cardápio completo ➜
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {featuredProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col text-left"
            >
              <img
                src={item.image || item.imagem}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-gray-900 text-lg mb-1">{item.name}</h3>
                <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">{item.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-lg font-black text-orange-600">
                    {(item.price || item.preco || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                  <button
                    type="button"
                    onClick={() => addToCart(item)}
                    className="bg-gray-900 hover:bg-orange-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    + Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Banner de Ação Final */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8 w-full">
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl p-8 sm:p-12 text-white text-center flex flex-col items-center gap-6 shadow-2xl shadow-orange-600/25">
          <h2 className="text-2xl sm:text-4xl font-black">Bateu a fome? Peça agora mesmo!</h2>
          <p className="text-sm sm:text-base text-orange-100 max-w-lg">
            Estamos prontos para preparar as melhores esfihas da cidade para você e sua família.
          </p>
          <Link
            to="/cardapio"
            className="bg-white text-orange-600 hover:bg-orange-50 active:scale-95 font-extrabold text-base sm:text-lg px-8 py-4 rounded-2xl shadow-lg transition-all"
          >
            Abrir o Cardápio 🥟
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

