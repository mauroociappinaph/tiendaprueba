import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import {
  products as mockProducts,
  cartQuantities,
  getCartItems,
} from "../api/shared";
import { Product, CartItem } from "@types";

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>("/api/products");
  return Array.isArray(response.data) ? response.data : [];
};

export const addToCartApi = async (productId: number): Promise<CartItem[]> => {
  const response = await axios.post<CartItem[]>("/api/cart", { id: productId });
  return Array.isArray(response.data) ? response.data : [];
};

export const getCartApi = async (): Promise<CartItem[]> => {
  const response = await axios.get<CartItem[]>("/api/cart");
  return Array.isArray(response.data) ? response.data : [];
};

export const changeCartQuantityApi = async (
  productId: number,
  quantity: number
): Promise<CartItem[]> => {
  const response = await axios.patch<CartItem[]>("/api/cart", {
    id: productId,
    quantity,
  });
  return Array.isArray(response.data) ? response.data : [];
};

export const clearCartApi = async (): Promise<CartItem[]> => {
  const response = await axios.delete<CartItem[]>("/api/cart");
  return Array.isArray(response.data) ? response.data : [];
};

// Dev-time axios mocks (only when running vite dev)
if (import.meta && import.meta.env && import.meta.env.DEV) {
  const mock = new AxiosMockAdapter(axios, { delayResponse: 200 });

  mock.onGet("/api/products").reply(() => {
    return [200, mockProducts];
  });

  mock.onGet("/api/cart").reply(() => {
    return [200, getCartItems()];
  });

  mock.onPost("/api/cart").reply((config) => {
    try {
      const { id } = JSON.parse(config.data || "{}");
      if (typeof id !== "number") return [400, { error: "Missing product id" }];
      const product = mockProducts.find((p) => p.id === id);
      if (!product) return [404, { error: "Product not found" }];
      const current = cartQuantities.get(id) ?? 0;
      cartQuantities.set(id, current + 1);
      return [200, getCartItems()];
    } catch {
      return [500, { error: "Invalid request" }];
    }
  });

  mock.onPatch("/api/cart").reply((config) => {
    try {
      const { id, quantity } = JSON.parse(config.data || "{}");
      if (typeof id !== "number" || typeof quantity !== "number") {
        return [400, { error: "Missing id or quantity" }];
      }
      const product = mockProducts.find((p) => p.id === id);
      if (!product) return [404, { error: "Product not found" }];
      if (quantity <= 0) cartQuantities.delete(id);
      else cartQuantities.set(id, quantity);
      return [200, getCartItems()];
    } catch {
      return [500, { error: "Invalid request" }];
    }
  });

  mock.onDelete("/api/cart").reply(() => {
    cartQuantities.clear();
    return [200, getCartItems()];
  });
}
