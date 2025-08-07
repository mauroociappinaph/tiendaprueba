import React from "react";
import { motion } from "framer-motion";
import { Box, Plus } from "lucide-react";
import { ProductListProps } from "./../types";
import { Card } from "./Card";

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onAddToCart,
}) => {
  return (
    <Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="bg-surface border border-border rounded-xl p-5 flex flex-col group relative overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            whileHover={{
              y: -5,
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex-grow flex flex-col text-left">
              <div className="flex justify-between items-start">
                <h3 className="font-body font-bold text-lg text-text-primary pr-4">
                  {product.name}
                </h3>
                <div className="flex-shrink-0 bg-primary-light p-2 rounded-full">
                  <Box className="h-5 w-5 text-primary" />
                </div>
              </div>
              <p className="text-primary text-3xl font-bold font-mono my-4">
                ${product.price.toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => onAddToCart(product)}
              className="mt-2 self-start inline-flex items-center gap-1 bg-primary border border-primary text-white font-medium py-2 px-3 rounded-full hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors text-sm"
              aria-label={`Agregar ${product.name} al carrito`}
            >
              <Plus className="h-4 w-4 mr-1" />
              Agregar al carrito
            </button>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};
