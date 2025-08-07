import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Product } from "./../types";

// This is the static dataset of products as specified in the technical test.
// This single source of truth is now used for both the store and the budget optimizer.
const products: Product[] = [
  { id: 1, name: "Producto 1", price: 60 },
  { id: 2, name: "Producto 2", price: 100 },
  { id: 3, name: "Producto 3", price: 120 },
  { id: 4, name: "Producto 4", price: 70 },
];

// This sets up a mock adapter for axios to simulate API calls.
const mock = new MockAdapter(axios, { delayResponse: 500 });

// Mock the GET request to /products. This will be intercepted by the mock adapter.
mock.onGet("/api/products").reply(200, products);

// This function fetches products from the mocked `/api/products` endpoint using axios.
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>("/api/products");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products with axios:", error);
    throw error;
  }
};
