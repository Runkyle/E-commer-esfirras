import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LocationState {
  orderData?: {
    customerName?: string;
    total?: number;
    deliveryType?: string;
  };
}

export const Sucesso: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const orderData = state?.orderData;

  return (
    <div className="sucesso-page max-w-2xl mx-auto px-4 sm:px-8 py-12 sm:py-20 text-center flex flex-col items-center gap-8">
      {/* Ícone Animado */}
      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl shadow-xl shadow-green-600/20 animate-bounce">
        ✓
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-black uppercase tracking-widest text-green-600">
          Pedido Confirmado!
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
          {orderData?.customerName ? `Obrigado, ${orderData.customerName}!` : 'Obrigado pelo seu pedido!'}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto leading-relaxed mt-1">
          Sua mensagem foi enviada para o nosso WhatsApp. Nossa equipe já está aquecendo o forno para preparar suas esfihas quentinhas!
        </p>
      </div>

      {/* Linha do Tempo / Status do Pedido */}
      <div className="w-full bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-4 text-left">
        <h2 className="text-sm font-extrabold text-gray-800 uppercase tracking-wider border-b border-gray-100 pb-2">
          Etapas do Pedido
        </h2>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-green-500 text-white font-bold flex items-center justify-center text-xs">
              ✓
            </span>
            <div>
              <p className="text-sm font-bold text-gray-900 m-0">Pedido enviado para o WhatsApp</p>
              <p className="text-xs text-gray-500 m-0">Aguardando confirmação do atendente</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-bold flex items-center justify-center text-xs">
              🔥
            </span>
            <div>
              <p className="text-sm font-bold text-gray-900 m-0">Preparação no Forno a Lenha</p>
              <p className="text-xs text-gray-500 m-0">Massa aberta e recheada na hora</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 font-bold flex items-center justify-center text-xs">
              🛵
            </span>
            <div>
              <p className="text-sm font-bold text-gray-400 m-0">
                {orderData?.deliveryType === 'pickup' ? 'Pronto para Retirada no Balcão' : 'Saiu para Entrega'}
              </p>
              <p className="text-xs text-gray-400 m-0">Previsão média: 30 a 45 minutos</p>
            </div>
          </div>
        </div>

        {orderData?.total && (
          <div className="mt-2 pt-3 border-t border-dashed border-gray-200 flex justify-between items-center text-sm font-bold">
            <span className="text-gray-500">Valor do Pedido:</span>
            <span className="text-orange-600 text-base font-black">
              {orderData.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
        )}
      </div>

      {/* Ações */}
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <Link
          to="/cardapio"
          className="bg-orange-600 hover:bg-orange-700 text-white font-black text-sm px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-orange-600/25 active:scale-95"
        >
          Fazer Novo Pedido 🥟
        </Link>
        <Link
          to="/"
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm px-6 py-3.5 rounded-xl transition-all"
        >
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
};

export default Sucesso;

