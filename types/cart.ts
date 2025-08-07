
import { Product } from './product';

export interface CartItem extends Product {
  quantity: number;
}

export interface CartProps {
  cartItems: CartItem[];
  total: number;
  onQuantityChange: (productId: number, newQuantity: number) => void;
  onClearCart: () => void;
}
