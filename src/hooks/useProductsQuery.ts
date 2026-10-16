import { useQuery } from '@tanstack/react-query';
import { productsService } from '../services/productsService';
import type { Product } from '../types/product';

// Chaves de consulta para gerenciamento e invalidação de cache
export const PRODUCT_KEYS = {
  all: ['products'] as const,
  byCategory: (category: string) => ['products', 'category', category] as const,
  detail: (id: number) => ['products', 'detail', id] as const,
};

/**
 * Hook do TanStack Query para buscar a lista de produtos com cache automático
 */
export function useProductsQuery() {
  return useQuery<Product[], Error>({
    queryKey: PRODUCT_KEYS.all,
    queryFn: () => productsService.getProducts(),
  });
}

/**
 * Hook do TanStack Query para buscar um produto por ID
 */
export function useProductDetailQuery(id: number) {
  return useQuery<Product | undefined, Error>({
    queryKey: PRODUCT_KEYS.detail(id),
    queryFn: () => productsService.getProductById(id),
    enabled: Boolean(id),
  });
}

