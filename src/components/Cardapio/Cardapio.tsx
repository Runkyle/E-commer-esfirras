import React, { useState, useMemo } from 'react';
import { products as defaultProducts } from '../../data/products';
import CartContext from '../../context/CartContext';
import type { Product } from '../../types/product';
import './Cardapio.css';

interface CardapioProps {
  productsList?: Product[];
  onAddToCart?: (product: Product) => void;
}

const CATEGORIES = ['Todas', 'Tradicionais', 'Especiais', 'Doces', 'Bebidas'];

export const Cardapio: React.FC<CardapioProps> = ({
  productsList = defaultProducts,
  onAddToCart,
}) => {
  const cartContext = React.useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [addedProductId, setAddedProductId] = useState<number | null>(null);

  // Contagem de itens por categoria
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      Todas: productsList.length,
    };

    CATEGORIES.slice(1).forEach((cat) => {
      counts[cat] = productsList.filter(
        (p) => (p.category || p.categoria) === cat
      ).length;
    });

    return counts;
  }, [productsList]);

  // Filtragem por categoria e termo de pesquisa
  const filteredProducts = useMemo(() => {
    return productsList.filter((product) => {
      const productCategory = product.category || product.categoria;
      const matchesCategory =
        selectedCategory === 'Todas' || productCategory === selectedCategory;

      const title = (product.name || product.nome || '').toLowerCase();
      const desc = (product.description || product.descricao || '').toLowerCase();
      const query = searchTerm.toLowerCase().trim();

      const matchesSearch =
        query === '' || title.includes(query) || desc.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [productsList, selectedCategory, searchTerm]);

  // Formatação de moeda em BRL
  const formatPrice = (val: number) => {
    return val.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleAddToCart = (product: Product) => {
    if (onAddToCart) {
      onAddToCart(product);
    } else if (cartContext) {
      cartContext.addToCart(product);
    }
    // Feedback visual temporário de adição
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId((current) => (current === product.id ? null : current));
    }, 1200);
  };

  return (
    <section className="cardapio-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10" id="cardapio">
      {/* Cabeçalho */}
      <header className="cardapio-header text-center mb-6 sm:mb-8">
        <span className="cardapio-badge inline-block bg-orange-100 text-orange-700 text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-2 sm:mb-3 border border-orange-200">
          Cardápio Completo
        </span>
        <h2 className="cardapio-title text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Nossas Delícias Árabes
        </h2>
        <p className="cardapio-subtitle text-xs sm:text-base text-gray-500 max-w-xl mx-auto mt-2">
          Esfihas artesanais assadas na hora com massa fresca, temperos autênticos e ingredientes selecionados.
        </p>
      </header>

      {/* Controles Mobile-First: Barra de Busca & Filtros com Scroll Horizontal */}
      <div className="cardapio-controls mb-8 flex flex-col gap-4 items-center">
        {/* Barra de Busca rápida */}
        <div className="search-wrapper relative w-full max-w-md">
          <svg
            className="search-icon absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            className="search-input w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 text-sm sm:text-base bg-white focus:outline-none focus:border-orange-500 focus:ring-3 focus:ring-orange-500/15 transition-all"
            placeholder="Buscar esfiha por nome ou ingrediente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Abas de Categoria com Scroll Horizontal no Celular */}
        <div className="cardapio-categories w-full flex items-center gap-2 overflow-x-auto pb-2 pt-1 px-1 sm:justify-center no-scrollbar" role="tablist">
          {CATEGORIES.map((category) => {
            const count = categoryCounts[category] ?? 0;
            const isActive = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                className={`category-btn whitespace-nowrap shrink-0 flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'active bg-orange-600 text-white shadow-md shadow-orange-600/30 border border-orange-600'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
                onClick={() => setSelectedCategory(category)}
                role="tab"
                aria-selected={isActive}
              >
                <span>{category}</span>
                <span className={`category-count text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
                  isActive ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Responsivo de Produtos (1 coluna mobile, 2 tablet, 3-4 desktop) */}
      {filteredProducts.length > 0 ? (
        <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => {
            const name = product.name || product.nome;
            const description = product.description || product.descricao;
            const price = product.price || product.preco || 0;
            const image = product.image || product.imagem;
            const category = product.category || product.categoria;
            const isJustAdded = addedProductId === product.id;

            return (
              <article
                key={product.id}
                className="product-card group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Imagem do Produto */}
                <div className="product-image-container relative w-full h-48 sm:h-52 overflow-hidden bg-gray-100">
                  <img
                    src={image}
                    alt={name}
                    className="product-image w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1777315387661-42a289edccba?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <span className="product-category-tag absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {category}
                  </span>
                </div>

                {/* Conteúdo do Card */}
                <div className="product-content p-4 sm:p-5 flex flex-col flex-grow text-left">
                  <h3 className="product-name font-extrabold text-gray-900 text-base sm:text-lg mb-1.5 leading-snug">
                    {name}
                  </h3>
                  <p className="product-description text-gray-500 text-xs sm:text-sm leading-relaxed mb-4 flex-grow line-clamp-2" title={description}>
                    {description}
                  </p>

                  <div className="product-footer pt-3 border-t border-dashed border-gray-100 flex items-center justify-between mt-auto">
                    <div className="product-price flex flex-col">
                      <span className="price-label text-[10px] text-gray-400 font-bold uppercase tracking-wider">Preço</span>
                      <span className="price-value text-lg sm:text-xl font-black text-orange-600">
                        {formatPrice(price)}
                      </span>
                    </div>

                    <button
                      type="button"
                      className={`btn-add inline-flex items-center gap-1.5 px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all active:scale-95 cursor-pointer ${
                        isJustAdded
                          ? 'added bg-green-600 text-white'
                          : 'bg-gray-900 hover:bg-orange-600 text-white shadow-xs'
                      }`}
                      onClick={() => handleAddToCart(product)}
                      aria-label={`Adicionar ${name} ao pedido`}
                    >
                      {isJustAdded ? (
                        <>✓ Adicionado</>
                      ) : (
                        <>+ Adicionar</>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* Estado Vazio */
        <div className="empty-state text-center py-12 px-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 my-6">
          <div className="empty-state-icon text-4xl mb-3">🔍</div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">Nenhum item encontrado</h3>
          <p className="text-sm text-gray-500 mb-4">
            Não encontramos nenhum produto para &quot;{selectedCategory}&quot;
            {searchTerm ? ` com o termo "${searchTerm}"` : ''}.
          </p>
          <button
            type="button"
            className="btn-reset-filter bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
            onClick={() => {
              setSelectedCategory('Todas');
              setSearchTerm('');
            }}
          >
            Limpar filtros
          </button>
        </div>
      )}
    </section>
  );
};

export default Cardapio;
