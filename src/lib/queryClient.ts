import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos de cache fresco (não refaz requisições desnecessárias)
      gcTime: 1000 * 60 * 15, // 15 minutos de persistência na memória
      refetchOnWindowFocus: false, // Não recarrega toda vez que o usuário troca de aba
      retry: 2, // Tenta novamente até 2 vezes em caso de falha de conexão
    },
    mutations: {
      retry: 1,
    },
  },
});

