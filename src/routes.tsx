import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Cardapio from './pages/Cardapio';
import Carrinho from './pages/Carrinho';
import Checkout from './pages/Checkout';
import Sucesso from './pages/Sucesso';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* 1. Página Inicial / Apresentação da Esfiharia */}
      <Route path="/" element={<Home />} />

      {/* 2. Cardápio Completo para escolha das esfihas */}
      <Route path="/cardapio" element={<Cardapio />} />

      {/* 3. Carrinho / Resumo dos itens selecionados */}
      <Route path="/carrinho" element={<Carrinho />} />

      {/* 4. Checkout / Formulário de entrega e pagamento */}
      <Route path="/checkout" element={<Checkout />} />

      {/* 5. Sucesso / Confirmação do envio do pedido */}
      <Route path="/sucesso" element={<Sucesso />} />

      {/* Redirecionamento para a Home caso a rota não exista */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;

