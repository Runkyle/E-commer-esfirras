import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const RESTAURANT_WHATSAPP_NUMBER = '5511999999999';

export const Checkout: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  // Estados dos Dados do Cliente
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');

  // Estados de Endereço
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [complement, setComplement] = useState('');

  // Estados de Pagamento
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | 'cash'>('pix');
  const [cardType, setCardType] = useState<'credit' | 'debit'>('credit');
  const [needChange, setNeedChange] = useState<boolean>(false);
  const [changeFor, setChangeFor] = useState('');

  // Observações adicionais
  const [observations, setObservations] = useState('');

  // Erros de validação
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const deliveryFee = deliveryType === 'delivery' ? 5.00 : 0.00;
  const finalTotal = totalPrice + deliveryFee;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Por favor, informe seu nome completo.';
    if (!phone.trim()) newErrors.phone = 'Informe seu WhatsApp para contato.';

    if (deliveryType === 'delivery') {
      if (!street.trim()) newErrors.street = 'Informe a rua ou avenida.';
      if (!number.trim()) newErrors.number = 'Informe o número.';
      if (!neighborhood.trim()) newErrors.neighborhood = 'Informe o bairro.';
    }

    if (paymentMethod === 'cash' && needChange && !changeFor.trim()) {
      newErrors.changeFor = 'Informe o valor para troco.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFinalize = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    let paymentDesc = '';
    if (paymentMethod === 'pix') {
      paymentDesc = '🔑 Pix (solicito a chave Pix)';
    } else if (paymentMethod === 'card') {
      paymentDesc = `💳 Cartão na entrega (${cardType === 'credit' ? 'Crédito' : 'Débito'} na maquininha)`;
    } else {
      paymentDesc = needChange
        ? `💵 Dinheiro (Troco para ${changeFor})`
        : '💵 Dinheiro (Não precisa de troco)';
    }

    const itemsText = cart
      .map((item) => {
        const itemName = item.name || item.nome;
        const itemPrice = item.price || item.preco || 0;
        const subtotal = itemPrice * item.quantity;
        return `• ${item.quantity}x ${itemName} (${formatCurrency(itemPrice)}) = ${formatCurrency(subtotal)}`;
      })
      .join('\n');

    const addressText =
      deliveryType === 'delivery'
        ? `📍 *ENTREGA EM DOMICÍLIO*\n• Endereço: ${street}, Nº ${number}\n• Bairro: ${neighborhood}\n• Ponto de Ref / Compl: ${complement.trim() ? complement : 'Não informado'}`
        : `🏬 *RETIRADA NO BALCÃO*\n(Vou retirar o pedido diretamente no balcão da esfiharia)`;

    const message = `🥟 *NOVO PEDIDO - ESFIHARIA EXPRESS* 🥟
━━━━━━━━━━━━━━━━━━━━━━
👤 *CLIENTE:*
• Nome: ${name.trim()}
• WhatsApp: ${phone.trim()}

${addressText}

📋 *ITENS DO PEDIDO:*
${itemsText}

${observations.trim() ? `📝 *OBSERVAÇÕES:*\n"${observations.trim()}"\n\n` : ''}💰 *FORMA DE PAGAMENTO:*
• ${paymentDesc}
━━━━━━━━━━━━━━━━━━━━━━
Subtotal: ${formatCurrency(totalPrice)}
Taxa de Entrega: ${deliveryType === 'delivery' ? formatCurrency(deliveryFee) : 'Grátis'}
*TOTAL FINAL: ${formatCurrency(finalTotal)}*
━━━━━━━━━━━━━━━━━━━━━━
_Aguardando confirmação do pedido pelo restaurante!_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${RESTAURANT_WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Abre o WhatsApp
    window.open(whatsappUrl, '_blank');

    // Salva resumo para a tela de sucesso e limpa o carrinho
    const orderData = {
      customerName: name,
      total: finalTotal,
      deliveryType,
    };

    clearCart();
    navigate('/sucesso', { state: { orderData } });
  };

  // Se o carrinho estiver vazio, sugere voltar ao cardápio
  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <span className="text-6xl mb-4 block">🥟</span>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Você não tem itens no carrinho</h2>
        <p className="text-sm text-gray-500 mb-6">Adicione deliciosas esfihas para finalizar seu pedido.</p>
        <Link
          to="/cardapio"
          className="bg-orange-600 hover:bg-orange-700 text-white font-extrabold px-6 py-3 rounded-xl transition-all"
        >
          Ir para o Cardápio
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12 text-left">
      <div className="border-b border-gray-100 pb-4 mb-8">
        <span className="text-xs text-orange-600 font-extrabold uppercase tracking-wider">
          Etapa Final
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-gray-900 mt-1">
          Finalização do Pedido
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Preencha seus dados de entrega e forma de pagamento para despacharmos suas esfihas.
        </p>
      </div>

      <form onSubmit={handleFinalize} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário (2 Colunas) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* 1. Dados Pessoais */}
          <section className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col gap-4">
            <h2 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
              <span>👤</span> 1. Dados Pessoais
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700" htmlFor="page-name">
                  Nome Completo *
                </label>
                <input
                  id="page-name"
                  type="text"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                    errors.name ? 'border-red-500 bg-red-50/20' : 'border-gray-200 focus:border-orange-500'
                  }`}
                  placeholder="Ex: Maria Eduarda Santos"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                  }}
                />
                {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700" htmlFor="page-phone">
                  WhatsApp / Telefone *
                </label>
                <input
                  id="page-phone"
                  type="tel"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                    errors.phone ? 'border-red-500 bg-red-50/20' : 'border-gray-200 focus:border-orange-500'
                  }`}
                  placeholder="Ex: (11) 98765-4321"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                  }}
                />
                {errors.phone && <span className="text-xs text-red-500">{errors.phone}</span>}
              </div>
            </div>
          </section>

          {/* 2. Entrega e Endereço */}
          <section className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col gap-4">
            <h2 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
              <span>📍</span> 2. Forma de Recebimento
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className={`p-3.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  deliveryType === 'delivery'
                    ? 'bg-orange-50 border-orange-500 text-orange-800'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setDeliveryType('delivery')}
              >
                <span>🛵 Entrega em Domicílio (+R$ 5)</span>
              </button>
              <button
                type="button"
                className={`p-3.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  deliveryType === 'pickup'
                    ? 'bg-orange-50 border-orange-500 text-orange-800'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setDeliveryType('pickup')}
              >
                <span>🏬 Retirar no Balcão (Grátis)</span>
              </button>
            </div>

            {deliveryType === 'delivery' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="sm:col-span-2 flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-700" htmlFor="page-street">
                    Rua / Avenida *
                  </label>
                  <input
                    id="page-street"
                    type="text"
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                      errors.street ? 'border-red-500 bg-red-50/20' : 'border-gray-200 focus:border-orange-500'
                    }`}
                    placeholder="Ex: Rua das Esfihas"
                    value={street}
                    onChange={(e) => {
                      setStreet(e.target.value);
                      if (errors.street) setErrors((prev) => ({ ...prev, street: '' }));
                    }}
                  />
                  {errors.street && <span className="text-xs text-red-500">{errors.street}</span>}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-700" htmlFor="page-number">
                    Número *
                  </label>
                  <input
                    id="page-number"
                    type="text"
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                      errors.number ? 'border-red-500 bg-red-50/20' : 'border-gray-200 focus:border-orange-500'
                    }`}
                    placeholder="Ex: 142"
                    value={number}
                    onChange={(e) => {
                      setNumber(e.target.value);
                      if (errors.number) setErrors((prev) => ({ ...prev, number: '' }));
                    }}
                  />
                  {errors.number && <span className="text-xs text-red-500">{errors.number}</span>}
                </div>

                <div className="sm:col-span-3 flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-700" htmlFor="page-neigh">
                    Bairro *
                  </label>
                  <input
                    id="page-neigh"
                    type="text"
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                      errors.neighborhood ? 'border-red-500 bg-red-50/20' : 'border-gray-200 focus:border-orange-500'
                    }`}
                    placeholder="Ex: Vila Mariana"
                    value={neighborhood}
                    onChange={(e) => {
                      setNeighborhood(e.target.value);
                      if (errors.neighborhood) setErrors((prev) => ({ ...prev, neighborhood: '' }));
                    }}
                  />
                  {errors.neighborhood && <span className="text-xs text-red-500">{errors.neighborhood}</span>}
                </div>

                <div className="sm:col-span-3 flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-700" htmlFor="page-comp">
                    Complemento / Ponto de Referência
                  </label>
                  <input
                    id="page-comp"
                    type="text"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    placeholder="Ex: Apto 12, Bloco C, em frente à farmácia"
                    value={complement}
                    onChange={(e) => setComplement(e.target.value)}
                  />
                </div>
              </div>
            )}
          </section>

          {/* 3. Forma de Pagamento */}
          <section className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col gap-4">
            <h2 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
              <span>💳</span> 3. Forma de Pagamento
            </h2>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                className={`p-3.5 rounded-xl border flex flex-col sm:flex-row items-center justify-center gap-2 transition-all cursor-pointer ${
                  paymentMethod === 'pix'
                    ? 'bg-orange-50 border-orange-500 text-orange-800'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setPaymentMethod('pix')}
              >
                <span className="text-xl">🔑</span>
                <span className="text-xs sm:text-sm font-bold">Pix</span>
              </button>

              <button
                type="button"
                className={`p-3.5 rounded-xl border flex flex-col sm:flex-row items-center justify-center gap-2 transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'bg-orange-50 border-orange-500 text-orange-800'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setPaymentMethod('card')}
              >
                <span className="text-xl">💳</span>
                <span className="text-xs sm:text-sm font-bold">Cartão</span>
              </button>

              <button
                type="button"
                className={`p-3.5 rounded-xl border flex flex-col sm:flex-row items-center justify-center gap-2 transition-all cursor-pointer ${
                  paymentMethod === 'cash'
                    ? 'bg-orange-50 border-orange-500 text-orange-800'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setPaymentMethod('cash')}
              >
                <span className="text-xl">💵</span>
                <span className="text-xs sm:text-sm font-bold">Dinheiro</span>
              </button>
            </div>

            {paymentMethod === 'pix' && (
              <div className="bg-green-50/70 border border-green-200 text-green-800 p-3.5 rounded-xl text-xs sm:text-sm">
                ⚡ <strong>Chave Pix:</strong> A chave Pix será informada no WhatsApp para você efetuar a transferência rápida.
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="bg-gray-50 border border-gray-200 p-3.5 rounded-xl flex flex-col gap-2 text-xs sm:text-sm">
                <span className="font-bold text-gray-700">Selecione o tipo do cartão:</span>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="pageCardType"
                      value="credit"
                      checked={cardType === 'credit'}
                      onChange={() => setCardType('credit')}
                    />
                    Crédito
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="pageCardType"
                      value="debit"
                      checked={cardType === 'debit'}
                      onChange={() => setCardType('debit')}
                    />
                    Débito
                  </label>
                </div>
                <small className="text-gray-400">O entregador levará a maquininha até você.</small>
              </div>
            )}

            {paymentMethod === 'cash' && (
              <div className="bg-gray-50 border border-gray-200 p-3.5 rounded-xl flex flex-col gap-2 text-xs sm:text-sm">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700">
                  <input
                    type="checkbox"
                    checked={needChange}
                    onChange={(e) => setNeedChange(e.target.checked)}
                  />
                  Precisa de troco?
                </label>

                {needChange && (
                  <div className="flex flex-col gap-1 mt-1">
                    <label className="text-xs text-gray-600 font-semibold" htmlFor="page-change">
                      Troco para quanto? *
                    </label>
                    <input
                      id="page-change"
                      type="text"
                      className={`w-full px-3 py-2 rounded-xl border text-sm focus:outline-none ${
                        errors.changeFor ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="Ex: R$ 50,00 ou R$ 100,00"
                      value={changeFor}
                      onChange={(e) => {
                        setChangeFor(e.target.value);
                        if (errors.changeFor) setErrors((prev) => ({ ...prev, changeFor: '' }));
                      }}
                    />
                    {errors.changeFor && <span className="text-xs text-red-500">{errors.changeFor}</span>}
                  </div>
                )}
              </div>
            )}
          </section>

          {/* 4. Observações */}
          <section className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col gap-2">
            <h2 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
              <span>📝</span> 4. Observações (Opcional)
            </h2>
            <textarea
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              rows={2}
              placeholder="Ex: Sem cebola em uma esfiha, caprichar no limão..."
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
            />
          </section>
        </div>

        {/* Resumo do Pedido na Lateral */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-4 sticky top-24">
            <h2 className="text-lg font-black text-gray-900 border-b border-gray-100 pb-3">
              Resumo do Pedido
            </h2>

            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1 text-xs sm:text-sm text-gray-600">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <span>{item.quantity}x {item.name || item.nome}</span>
                  <strong className="text-gray-800">
                    {formatCurrency((item.price || item.preco || 0) * item.quantity)}
                  </strong>
                </div>
              ))}
            </div>

            <div className="border-t border-dashed border-gray-200 pt-3 flex flex-col gap-1.5 text-xs sm:text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Taxa de Entrega</span>
                <span>{deliveryType === 'delivery' ? formatCurrency(deliveryFee) : 'Grátis'}</span>
              </div>
              <div className="flex justify-between text-base sm:text-lg font-black text-gray-900 pt-2 border-t border-gray-100">
                <span>Total a Pagar</span>
                <span className="text-orange-600">{formatCurrency(finalTotal)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-extrabold py-4 px-4 rounded-2xl shadow-xl shadow-green-600/25 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer text-sm sm:text-base mt-2"
            >
              <span>Confirmar pelo WhatsApp</span>
              <span>📲</span>
            </button>

            <Link
              to="/carrinho"
              className="text-xs text-gray-400 hover:text-gray-600 text-center font-bold"
            >
              ← Voltar para a Sacola
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;

