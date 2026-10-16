import { products as localProducts } from '../data/products';
import type { Product } from '../types/product';

/**
 * Serviço responsável por buscar os dados dos produtos.
 * Simula uma chamada assíncrona de API com latência de rede realista.
 * Facilmente substituível por um fetch() real ou axios quando houver backend.
 */
export const productsService = {
  // Buscar todas as esfihas e bebidas
  async getProducts(): Promise<Product[]> {
    // Simula tempo de resposta de rede (400ms)
    await new Promise((resolve) => setTimeout(resolve, 400));
    return [...localProducts];
  },

  // Buscar um produto específico por ID
  async getProductById(id: number): Promise<Product | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return localProducts.find((item) => item.id === id);
  },

  // Buscar produtos filtrados por categoria
  async getProductsByCategory(category: string): Promise<Product[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (category === 'Todas') {
      return [...localProducts];
    }
    return localProducts.filter(
      (item) => (item.category || item.categoria) === category
    );
  },
};

