import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import './CheckoutModal.css';

// Número de WhatsApp da esfiharia (DDI + DDD + Número)
const RESTAURANT_WHATSAPP_NUMBER = '5511999999999';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    totalPrice,
    clearCart,
    isCheckoutOpen,
    closeCheckout,
    openCart,
  } = useCart();

  // Estados dos Dados do Cliente
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');

  // Estados de Endereço (se entrega)
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

  // Validação de erros
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Fecha com ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCheckoutOpen) {
        closeCheckout();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCheckoutOpen, closeCheckout]);

  // Trava o scroll do body quando aberto
  useEffect(() => {
    if (isCheckoutOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsSuccess(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCheckoutOpen]);

  // Formatação de moeda BRL
  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const deliveryFee = deliveryType === 'delivery' ? 5.00 : 0.00;
  const finalTotal = totalPrice + deliveryFee;

  // Validação do formulário
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Por favor, informe seu nome completo.';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Informe seu telefone/WhatsApp para contato.';
    }

    if (deliveryType === 'delivery') {
      if (!street.trim()) {
        newErrors.street = 'Informe a rua ou avenida.';
      }
      if (!number.trim()) {
        newErrors.number = 'Informe o número.';
      }
      if (!neighborhood.trim()) {
        newErrors.neighborhood = 'Informe o bairro.';
      }
    }

    if (paymentMethod === 'cash' && needChange && !changeFor.trim()) {
      newErrors.changeFor = 'Informe o valor para troco.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Montagem do texto estruturado para o WhatsApp
  const handleFinalizeOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

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

    window.open(whatsappUrl, '_blank');
    clearCart();
    setIsSuccess(true);
  };

  return (
    <div
      className={`checkout-overlay ${isCheckoutOpen ? 'open' : ''} fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4`}
      onClick={closeCheckout}
      role="dialog"
      aria-modal="true"
      aria-label="Finalização do Pedido"
    >
      <div
        className="checkout-modal w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-2xl bg-white sm:rounded-3xl flex flex-col shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="checkout-header p-4 sm:p-5 border-b border-gray-100 bg-gray-50/70 flex items-center justify-between shrink-0">
          <div className="checkout-header-left flex items-center gap-3">
            <span className="checkout-icon text-2xl sm:text-3xl">🛵</span>
            <div>
              <h3 className="checkout-title text-base sm:text-xl font-black text-gray-900 m-0">
                Finalizar Pedido
              </h3>
              <p className="checkout-subtitle text-xs text-gray-500 m-0">
                Preencha seus dados para receber suas esfihas
              </p>
            </div>
          </div>
          <button
            type="button"
            className="checkout-close-btn text-gray-400 hover:text-gray-800 p-1.5 rounded-lg hover:bg-gray-100 text-xl leading-none transition-all cursor-pointer"
            onClick={closeCheckout}
            aria-label="Fechar checkout"
          >
            ✕
          </button>
        </div>

        {/* Conteúdo: Sucesso ou Formulário */}
        {isSuccess ? (
          <div className="order-success-card flex-grow flex flex-col items-center justify-center p-8 text-center gap-3">
            <div className="success-icon text-6xl mb-2 animate-bounce">🎉</div>
            <h3 className="order-success-title text-xl sm:text-2xl font-black text-green-700 m-0">
              Pedido Enviado com Sucesso!
            </h3>
            <p className="order-success-desc text-sm text-gray-600 max-w-md leading-relaxed m-0">
              Sua mensagem foi formatada e aberta no WhatsApp. Nossa equipe já está preparando suas esfihas quentinhas!
            </p>
            <button
              type="button"
              className="btn-finish-shopping mt-4 bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-orange-600/25 active:scale-95 cursor-pointer"
              onClick={closeCheckout}
            >
              Voltar ao Cardápio
            </button>
          </div>
        ) : (
          <form onSubmit={handleFinalizeOrder} className="flex flex-col flex-grow overflow-hidden">
            <div className="checkout-body flex-grow overflow-y-auto p-4 sm:p-6 flex flex-col gap-5 sm:gap-6">
              {/* 1. Dados Pessoais */}
              <section className="checkout-section flex flex-col gap-3">
                <h4 className="section-title text-sm sm:text-base font-extrabold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                  <span>👤</span> 1. Seus Dados Pessoais
                </h4>
                <div className="form-grid grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="form-group sm:col-span-2 flex flex-col gap-1 text-left">
                    <label className="form-label text-xs font-bold text-gray-700" htmlFor="cust-name">
                      Nome Completo *
                    </label>
                    <input
                      id="cust-name"
                      type="text"
                      className={`form-input w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                        errors.name ? 'border-red-500 bg-red-50/30' : 'border-gray-200 focus:border-orange-500'
                      }`}
                      placeholder="Ex: Carlos Eduardo Silva"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                      }}
                    />
                    {errors.name && <span className="input-error-msg text-xs text-red-500">{errors.name}</span>}
                  </div>

                  <div className="form-group sm:col-span-2 flex flex-col gap-1 text-left">
                    <label className="form-label text-xs font-bold text-gray-700" htmlFor="cust-phone">
                      WhatsApp / Telefone *
                    </label>
                    <input
                      id="cust-phone"
                      type="tel"
                      className={`form-input w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                        errors.phone ? 'border-red-500 bg-red-50/30' : 'border-gray-200 focus:border-orange-500'
                      }`}
                      placeholder="Ex: (11) 98765-4321"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                      }}
                    />
                    {errors.phone && <span className="input-error-msg text-xs text-red-500">{errors.phone}</span>}
                  </div>
                </div>
              </section>

              {/* 2. Tipo de Entrega & Endereço */}
              <section className="checkout-section flex flex-col gap-3">
                <h4 className="section-title text-sm sm:text-base font-extrabold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                  <span>📍</span> 2. Como deseja receber?
                </h4>

                <div className="delivery-type-selector grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    className={`type-option-btn p-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      deliveryType === 'delivery'
                        ? 'bg-orange-50 border-orange-500 text-orange-700'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setDeliveryType('delivery')}
                  >
                    <span>🛵 Entrega (+R$ 5)</span>
                  </button>
                  <button
                    type="button"
                    className={`type-option-btn p-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      deliveryType === 'pickup'
                        ? 'bg-orange-50 border-orange-500 text-orange-700'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setDeliveryType('pickup')}
                  >
                    <span>🏬 Retirar no Balcão</span>
                  </button>
                </div>

                {deliveryType === 'delivery' && (
                  <div className="form-grid grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    <div className="form-group sm:col-span-2 flex flex-col gap-1 text-left">
                      <label className="form-label text-xs font-bold text-gray-700" htmlFor="addr-street">
                        Rua / Avenida *
                      </label>
                      <input
                        id="addr-street"
                        type="text"
                        className={`form-input w-full px-3 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                          errors.street ? 'border-red-500 bg-red-50/30' : 'border-gray-200 focus:border-orange-500'
                        }`}
                        placeholder="Ex: Rua das Esfihas"
                        value={street}
                        onChange={(e) => {
                          setStreet(e.target.value);
                          if (errors.street) setErrors((prev) => ({ ...prev, street: '' }));
                        }}
                      />
                      {errors.street && <span className="input-error-msg text-xs text-red-500">{errors.street}</span>}
                    </div>

                    <div className="form-group flex flex-col gap-1 text-left">
                      <label className="form-label text-xs font-bold text-gray-700" htmlFor="addr-number">
                        Número *
                      </label>
                      <input
                        id="addr-number"
                        type="text"
                        className={`form-input w-full px-3 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                          errors.number ? 'border-red-500 bg-red-50/30' : 'border-gray-200 focus:border-orange-500'
                        }`}
                        placeholder="Ex: 142"
                        value={number}
                        onChange={(e) => {
                          setNumber(e.target.value);
                          if (errors.number) setErrors((prev) => ({ ...prev, number: '' }));
                        }}
                      />
                      {errors.number && <span className="input-error-msg text-xs text-red-500">{errors.number}</span>}
                    </div>

                    <div className="form-group sm:col-span-3 flex flex-col gap-1 text-left">
                      <label className="form-label text-xs font-bold text-gray-700" htmlFor="addr-neighborhood">
                        Bairro *
                      </label>
                      <input
                        id="addr-neighborhood"
                        type="text"
                        className={`form-input w-full px-3 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                          errors.neighborhood ? 'border-red-500 bg-red-50/30' : 'border-gray-200 focus:border-orange-500'
                        }`}
                        placeholder="Ex: Centro ou Vila Mariana"
                        value={neighborhood}
                        onChange={(e) => {
                          setNeighborhood(e.target.value);
                          if (errors.neighborhood) setErrors((prev) => ({ ...prev, neighborhood: '' }));
                        }}
                      />
                      {errors.neighborhood && <span className="input-error-msg text-xs text-red-500">{errors.neighborhood}</span>}
                    </div>

                    <div className="form-group sm:col-span-3 flex flex-col gap-1 text-left">
                      <label className="form-label text-xs font-bold text-gray-700" htmlFor="addr-comp">
                        Complemento / Ponto de Referência
                      </label>
                      <input
                        id="addr-comp"
                        type="text"
                        className="form-input w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                        placeholder="Ex: Apto 32B, ao lado da praça"
                        value={complement}
                        onChange={(e) => setComplement(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </section>

              {/* 3. Forma de Pagamento */}
              <section className="checkout-section flex flex-col gap-3">
                <h4 className="section-title text-sm sm:text-base font-extrabold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                  <span>💳</span> 3. Forma de Pagamento
                </h4>

                <div className="payment-methods-grid grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    className={`payment-method-card p-3 rounded-xl border flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all cursor-pointer ${
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
                    className={`payment-method-card p-3 rounded-xl border flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all cursor-pointer ${
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
                    className={`payment-method-card p-3 rounded-xl border flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all cursor-pointer ${
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

                {/* Detalhe do Pix */}
                {paymentMethod === 'pix' && (
                  <div className="payment-detail-box bg-green-50/70 border border-green-200 text-green-800 p-3 rounded-xl text-xs sm:text-sm">
                    ⚡ <strong>Chave Pix:</strong> A chave e o QR Code serão enviados na conversa do WhatsApp para confirmação do pagamento.
                  </div>
                )}

                {/* Detalhe do Cartão */}
                {paymentMethod === 'card' && (
                  <div className="payment-detail-box bg-gray-50 border border-gray-200 p-3 rounded-xl flex flex-col gap-2 text-xs sm:text-sm">
                    <span className="font-bold text-gray-700">Selecione o tipo:</span>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="cardType"
                          value="credit"
                          checked={cardType === 'credit'}
                          onChange={() => setCardType('credit')}
                        />
                        Crédito
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="cardType"
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

                {/* Detalhe do Dinheiro */}
                {paymentMethod === 'cash' && (
                  <div className="payment-detail-box bg-gray-50 border border-gray-200 p-3 rounded-xl flex flex-col gap-2 text-xs sm:text-sm">
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700">
                      <input
                        type="checkbox"
                        checked={needChange}
                        onChange={(e) => setNeedChange(e.target.checked)}
                      />
                      Precisa de troco?
                    </label>

                    {needChange && (
                      <div className="flex flex-col gap-1 mt-1 text-left">
                        <label className="text-xs text-gray-600 font-semibold" htmlFor="change-for">
                          Troco para quanto? *
                        </label>
                        <input
                          id="change-for"
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
              <section className="checkout-section flex flex-col gap-2">
                <h4 className="section-title text-sm sm:text-base font-extrabold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                  <span>📝</span> 4. Observações (Opcional)
                </h4>
                <textarea
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  rows={2}
                  placeholder="Ex: Mandar limão extra, interfone 302..."
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                />
              </section>

              {/* 5. Resumo do Pedido */}
              <section className="checkout-summary-box bg-gray-50/70 border border-gray-200 rounded-2xl p-3.5 sm:p-4">
                <div className="summary-items-list flex flex-col gap-1.5 max-h-28 overflow-y-auto mb-3 pr-1 text-xs sm:text-sm text-gray-600">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <span>{item.quantity}x {item.name || item.nome}</span>
                      <strong className="text-gray-800">{formatCurrency((item.price || item.preco || 0) * item.quantity)}</strong>
                    </div>
                  ))}
                </div>

                <div className="summary-totals border-t border-dashed border-gray-200 pt-2 flex flex-col gap-1 text-xs sm:text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Taxa de Entrega</span>
                    <span>{deliveryType === 'delivery' ? formatCurrency(deliveryFee) : 'Grátis'}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base font-black text-gray-900 pt-1">
                    <span>Total a Pagar</span>
                    <span className="text-orange-600">{formatCurrency(finalTotal)}</span>
                  </div>
                </div>
              </section>
            </div>

            {/* Rodapé Mobile-First com Botões */}
            <div className="checkout-footer p-4 sm:p-5 border-t border-gray-100 bg-gray-50/80 flex flex-col sm:flex-row items-center gap-2.5 shrink-0">
              <button
                type="button"
                className="btn-back-cart w-full sm:w-auto px-4 py-3 rounded-xl border border-gray-300 text-gray-700 font-bold text-xs sm:text-sm hover:bg-gray-100 transition-all cursor-pointer order-2 sm:order-1"
                onClick={() => {
                  closeCheckout();
                  openCart();
                }}
              >
                ← Voltar
              </button>

              <button
                type="submit"
                className="btn-send-whatsapp w-full sm:flex-1 bg-green-600 hover:bg-green-700 text-white font-extrabold py-3.5 px-4 rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-green-600/25 active:scale-98 transition-all cursor-pointer order-1 sm:order-2"
              >
                <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>Enviar pelo WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
