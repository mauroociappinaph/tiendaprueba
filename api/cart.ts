import { cartQuantities, getCartItems, products } from "./shared";

export default function handler(req: any, res: any) {
  if (req.method === "GET") {
    return res.status(200).json(getCartItems());
  }

  if (req.method === "POST") {
    const { id } = req.body as { id?: number };
    if (!id) {
      return res.status(400).json({ error: "Missing product id" });
    }
    const product = products.find((p) => p.id === id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    const current = cartQuantities.get(id) ?? 0;
    cartQuantities.set(id, current + 1);
    return res.status(200).json(getCartItems());
  }

  if (req.method === "PATCH") {
    const { id, quantity } = req.body as { id?: number; quantity?: number };
    if (typeof id !== "number" || typeof quantity !== "number") {
      return res.status(400).json({ error: "Missing id or quantity" });
    }
    const product = products.find((p) => p.id === id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    if (quantity <= 0) {
      cartQuantities.delete(id);
    } else {
      cartQuantities.set(id, quantity);
    }
    return res.status(200).json(getCartItems());
  }

  if (req.method === "DELETE") {
    cartQuantities.clear();
    return res.status(200).json(getCartItems());
  }

  res.status(405).json({ error: "Method Not Allowed" });
}
