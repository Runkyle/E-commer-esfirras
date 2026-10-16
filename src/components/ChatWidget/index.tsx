import { useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 1. Definindo o Schema de validação com Zod
const chatMessageSchema = z.object({
  message: z
    .string()
    .min(1, 'Digite alguma mensagem antes de enviar')
    .max(250, 'A mensagem é muito longa'),
});

// 2. Inferindo o tipo do TypeScript a partir do schema
type ChatFormData = z.infer<typeof chatMessageSchema>;

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Olá! Sou o assistente virtual da esfirraria. Em dúvida sobre qual sabor escolher hoje?',
    },
  ]);

  // 3. Configurando o React Hook Form com Zod Resolver
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChatFormData>({
    mode: 'onBlur',
    resolver: zodResolver(chatMessageSchema),
  });

  // 4. Função de envio tratada pelo React Hook Form
  const handleSendMessage = (data: ChatFormData) => {
    // Adiciona a mensagem do usuário usando o valor validado pelo Zod
    const userMsg: Message = {
      id: String(Date.now()),
      sender: 'user',
      text: data.message,
    };

    setMessages((prev) => [...prev, userMsg]);
    reset(); // Limpa o input após o envio bem-sucedido

    // Simulação de resposta da IA
    setTimeout(() => {
      const aiResponse: Message = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: 'Que excelente escolha! Nossas esfirras de carne e queijo são as favoritas da casa. Deseja adicionar ao carrinho?',
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Botão Flutuante (Abre/Fecha) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-orange-600 hover:bg-orange-500 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-105 flex items-center justify-center cursor-pointer"
          aria-label="Abrir chat de atendimento"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Janela do Chat */}
      {isOpen && (
        <div className="bg-zinc-900 border border-zinc-700 w-80 sm:w-96 h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Cabeçalho do Chat */}
          <div className="bg-orange-600 px-4 py-3 flex justify-between items-center text-white">
            <div className="flex items-center space-x-2">
              <div className="bg-orange-700 p-1.5 rounded-full">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Assistente de Esfirras</h3>
                <span className="text-xs text-orange-200 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span> Online
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-orange-200 hover:text-white transition-colors p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Corpo / Histórico de Mensagens */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-zinc-950">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm ${
                    msg.sender === 'user'
                      ? 'bg-orange-600 text-white rounded-br-none'
                      : 'bg-zinc-800 text-zinc-200 rounded-bl-none border border-zinc-700'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Rodapé / Formulário com Validação */}
          <div className="bg-zinc-900 border-t border-zinc-800">
            <form onSubmit={handleSubmit(handleSendMessage)} className="p-3 flex gap-2 items-center">
              <div className="flex-1 relative">
                <input
                  type="text"
                  {...register('message')}
                  placeholder="Digite o que deseja comer..."
                  className="w-full bg-zinc-800 text-zinc-100 px-3 py-2 rounded-xl text-sm border border-zinc-700 focus:outline-none focus:border-orange-500"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-orange-600 hover:bg-orange-500 text-white p-2.5 rounded-xl transition-colors flex items-center justify-center cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Exibição de Erro de Validação do Zod */}
            {errors.message && (
              <span className="text-red-400 text-xs px-3 pb-2 block">
                {errors.message.message}
              </span>
            )}
          </div>

        </div>
      )}
    </div>
  );
}