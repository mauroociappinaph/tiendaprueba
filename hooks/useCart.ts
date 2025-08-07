import { useState, useMemo, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { CartItem, Product } from "@types";
import {
  addToCartApi,
  getCartApi,
  changeCartQuantityApi,
  clearCartApi,
} from "../services/api";

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const loadCart = useCallback(async () => {
    try {
      const items = await getCartApi();
      setCartItems(Array.isArray(items) ? items : []);
    } catch (error) {
      console.error("Failed to load cart from API", error);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const addToCart = async (productToAdd: Product) => {
    try {
      const items = await addToCartApi(productToAdd.id);
      setCartItems(Array.isArray(items) ? items : []);
      toast.success(`'${productToAdd.name}' añadido al carrito!`);
    } catch (error) {
      console.error("Failed to add to cart via API", error);
    }
  };

  const changeQuantity = async (productId: number, newQuantity: number) => {
    try {
      const items = await changeCartQuantityApi(productId, newQuantity);
      setCartItems(Array.isArray(items) ? items : []);
    } catch (error) {
      console.error("Failed to change quantity via API", error);
    }
  };

  const clearCart = async () => {
    try {
      const items = await clearCartApi();
      setCartItems(Array.isArray(items) ? items : []);
    } catch (error) {
      console.error("Failed to clear cart via API", error);
    }
  };

  const total = useMemo(() => {
    const itemsArray = Array.isArray(cartItems) ? cartItems : [];
    return itemsArray.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  return { cartItems, total, addToCart, changeQuantity, clearCart };
};
