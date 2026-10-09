import React from 'react';
import CardapioComponent from '../components/Cardapio/Cardapio';

export const CardapioPage: React.FC = () => {
  return (
    <div className="cardapio-page py-4 sm:py-8">
      {/* Componente de Listagem com Filtros por Categoria e Grid Responsivo */}
      <CardapioComponent />
    </div>
  );
};

export default CardapioPage;

