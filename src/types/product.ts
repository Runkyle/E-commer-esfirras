export interface Product {
  id: number;
  name: string;
  nome?: string;
  description: string;
  descricao?: string;
  price: number;
  preco?: number;
  image: string;
  imagem?: string;
  category: string;
  categoria?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

