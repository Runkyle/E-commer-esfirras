import type { Product } from '../types/product';

export const products: Product[] = [
  // --- TRADICIONAIS ---
  {
    id: 1,
    name: "Esfiha de Carne",
    nome: "Esfiha de Carne",
    description: "Tradicional esfiha aberta de carne moída temperada com tomates frescos, cebola, limão e especiarias árabes.",
    descricao: "Tradicional esfiha aberta de carne moída temperada com tomates frescos, cebola, limão e especiarias árabes.",
    price: 4.50,
    preco: 4.50,
    image: "https://images.unsplash.com/photo-1777315387661-42a289edccba?auto=format&fit=crop&w=600&q=80",
    imagem: "https://images.unsplash.com/photo-1777315387661-42a289edccba?auto=format&fit=crop&w=600&q=80",
    category: "Tradicionais",
    categoria: "Tradicionais"
  },
  {
    id: 2,
    name: "Esfiha de Queijo",
    nome: "Esfiha de Queijo",
    description: "Deliciosa combinação de queijo minas padrão e mussarela derretida, com um toque sutil de orégano.",
    descricao: "Deliciosa combinação de queijo minas padrão e mussarela derretida, com um toque sutil de orégano.",
    price: 4.90,
    preco: 4.90,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    imagem: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    category: "Tradicionais",
    categoria: "Tradicionais"
  },
  {
    id: 3,
    name: "Esfiha de Calabresa",
    nome: "Esfiha de Calabresa",
    description: "Calabresa moída artesanal bem temperada com toque de cebola fininha e azeitonas.",
    descricao: "Calabresa moída artesanal bem temperada com toque de cebola fininha e azeitonas.",
    price: 4.90,
    preco: 4.90,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80",
    imagem: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80",
    category: "Tradicionais",
    categoria: "Tradicionais"
  },
  {
    id: 4,
    name: "Esfiha de Frango com Catupiry",
    nome: "Esfiha de Frango com Catupiry",
    description: "Peito de frango desfiado suavemente temperado, coberto com o legítimo Catupiry cremoso.",
    descricao: "Peito de frango desfiado suavemente temperado, coberto com o legítimo Catupiry cremoso.",
    price: 5.50,
    preco: 5.50,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
    imagem: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
    category: "Tradicionais",
    categoria: "Tradicionais"
  },

  // --- ESPECIAIS ---
  {
    id: 5,
    name: "Esfiha de Zátar",
    nome: "Esfiha de Zátar",
    description: "Autêntica receita libanesa com mistura de zátar aromático, gergelim tostado, tomilho e azeite extravirgem.",
    descricao: "Autêntica receita libanesa com mistura de zátar aromático, gergelim tostado, tomilho e azeite extravirgem.",
    price: 5.20,
    preco: 5.20,
    image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=600&q=80",
    imagem: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=600&q=80",
    category: "Especiais",
    categoria: "Especiais"
  },
  {
    id: 6,
    name: "Esfiha de Espinafre com Ricota",
    nome: "Esfiha de Espinafre com Ricota",
    description: "Massa leve com espinafre fresco refogado no azeite, ricota cremosa e noz-moscada.",
    descricao: "Massa leve com espinafre fresco refogado no azeite, ricota cremosa e noz-moscada.",
    price: 5.20,
    preco: 5.20,
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80",
    imagem: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80",
    category: "Especiais",
    categoria: "Especiais"
  },
  {
    id: 7,
    name: "Esfiha de Carne com Queijo",
    nome: "Esfiha de Carne com Queijo",
    description: "A clássica carne temperada coberta com generosa camada de mussarela derretida e gratinada.",
    descricao: "A clássica carne temperada coberta com generosa camada de mussarela derretida e gratinada.",
    price: 5.90,
    preco: 5.90,
    image: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?auto=format&fit=crop&w=600&q=80",
    imagem: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?auto=format&fit=crop&w=600&q=80",
    category: "Especiais",
    categoria: "Especiais"
  },

  // --- DOCES ---
  {
    id: 8,
    name: "Esfiha de Nutella com Morango",
    nome: "Esfiha de Nutella com Morango",
    description: "Massa macia com farta camada do autêntico creme de avelã Nutella e fatias frescas de morango.",
    descricao: "Massa macia com farta camada do autêntico creme de avelã Nutella e fatias frescas de morango.",
    price: 7.50,
    preco: 7.50,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
    imagem: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
    category: "Doces",
    categoria: "Doces"
  },
  {
    id: 9,
    name: "Esfiha de Doce de Leite com Coco",
    nome: "Esfiha de Doce de Leite com Coco",
    description: "Recheada com doce de leite cremoso artesanal e finalizada com lascas de coco fresco levemente tostado.",
    descricao: "Recheada com doce de leite cremoso artesanal e finalizada com lascas de coco fresco levemente tostado.",
    price: 6.90,
    preco: 6.90,
    image: "https://images.pexels.com/photos/16107649/pexels-photo-16107649.jpeg?auto=compress&cs=tinysrgb&w=600",
    imagem: "https://images.pexels.com/photos/16107649/pexels-photo-16107649.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Doces",
    categoria: "Doces"
  },

  // --- COMBOS ---
  {
    id: 13,
    name: "Combo Individual (2 esfirras + lata)",
    nome: "Combo Individual (2 esfirras + lata)",
    description: "2 esfirras à sua escolha + 1 refrigerante em lata 350ml geladinho.",
    descricao: "2 esfirras à sua escolha + 1 refrigerante em lata 350ml geladinho.",
    price: 16.00,
    preco: 16.00,
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=600&q=80",
    imagem: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=600&q=80",
    category: "Combos",
    categoria: "Combos"
  },
  {
    id: 14,
    name: "Combo Dupla (4 esfirras + refri 1,5L)",
    nome: "Combo Dupla (4 esfirras + refri 1,5L)",
    description: "4 esfirras à sua escolha + 1 refrigerante 1,5L bem gelado.",
    descricao: "4 esfirras à sua escolha + 1 refrigerante 1,5L bem gelado.",
    price: 30.00,
    preco: 30.00,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    imagem: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    category: "Combos",
    categoria: "Combos"
  },
  {
    id: 15,
    name: "Combo Família (8 esfirras + refri 1,5L)",
    nome: "Combo Família (8 esfirras + refri 1,5L)",
    description: "8 esfirras à sua escolha + 1 refrigerante 1,5L para toda a família.",
    descricao: "8 esfirras à sua escolha + 1 refrigerante 1,5L para toda a família.",
    price: 54.00,
    preco: 54.00,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    imagem: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    category: "Combos",
    categoria: "Combos"
  },
  {
    id: 16,
    name: "Combo Turma (12 esfirras + 2 refris 1,5L)",
    nome: "Combo Turma (12 esfirras + 2 refris 1,5L)",
    description: "12 esfirras à sua escolha + 2 refrigerantes 1,5L para toda a galera.",
    descricao: "12 esfirras à sua escolha + 2 refrigerantes 1,5L para toda a galera.",
    price: 78.00,
    preco: 78.00,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    imagem: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    category: "Combos",
    categoria: "Combos"
  },

  // --- BEBIDAS ---
  {
    id: 10,
    name: "Coca-Cola Lata 350ml",
    nome: "Coca-Cola Lata 350ml",
    description: "Lata 350ml bem gelada.",
    descricao: "Lata 350ml bem gelada.",
    price: 6.00,
    preco: 6.00,
    image: "https://images.unsplash.com/photo-1771425732867-2a2f9ad34f34?auto=format&fit=crop&w=600&q=80",
    imagem: "https://images.unsplash.com/photo-1771425732867-2a2f9ad34f34?auto=format&fit=crop&w=600&q=80",
    category: "Bebidas",
    categoria: "Bebidas"
  },
  {
    id: 11,
    name: "Suco Natural de Laranja 500ml",
    nome: "Suco Natural de Laranja 500ml",
    description: "Feito na hora com laranjas frescas e selecionadas, 100% natural sem adição de açúcar.",
    descricao: "Feito na hora com laranjas frescas e selecionadas, 100% natural sem adição de açúcar.",
    price: 8.50,
    preco: 8.50,
    image: "https://images.unsplash.com/photo-1740555612192-3e3cf77b5d1f?auto=format&fit=crop&w=600&q=80",
    imagem: "https://images.unsplash.com/photo-1740555612192-3e3cf77b5d1f?auto=format&fit=crop&w=600&q=80",
    category: "Bebidas",
    categoria: "Bebidas"
  },
  {
    id: 12,
    name: "Água Mineral 500ml",
    nome: "Água Mineral 500ml",
    description: "Garrafa 500ml com ou sem gás.",
    descricao: "Garrafa 500ml com ou sem gás.",
    price: 4.00,
    preco: 4.00,
    image: "https://images.pexels.com/photos/35020123/pexels-photo-35020123.jpeg?auto=compress&cs=tinysrgb&w=600",
    imagem: "https://images.pexels.com/photos/35020123/pexels-photo-35020123.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Bebidas",
    categoria: "Bebidas"
  }
];

export default products;

