import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator } from "lucide-react";
import { Product, BestCombinationListProps } from "../types";
import { formatCurrency } from "../utils/formatCurrency";

export const BestCombinationList: React.FC<BestCombinationListProps> = ({
  bestCombination,
  hasBudget,
}) => {
  const getProductName = (p?: Product) => p?.name ?? "Producto";
  const getProductPrice = (p?: Product) => {
    const price = Number(p?.price ?? 0);
    return Number.isFinite(price) ? price : 0;
  };
  const getProductKey = (p: Product | undefined, index: number) =>
    p?.id !== undefined && p?.id !== null ? String(p.id) : `p-${index}`;

  const safeList: Product[] = Array.isArray(bestCombination)
    ? (bestCombination.filter(Boolean) as Product[])
    : [];

  const combinationTotal = safeList.reduce(
    (sum, product) => sum + getProductPrice(product),
    0,
  );

  return (
    <div className="md:col-span-3">
      <h3 className="text-lg font-bold text-text-primary mb-2 flex justify-between items-baseline">
        <span>Combinación Óptima</span>
        {safeList.length > 0 && (
          <span className="text-base font-medium text-text-secondary">
            Total:{" "}
            <motion.span
              key={combinationTotal}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="text-primary font-bold font-mono text-lg inline-block"
            >
              {formatCurrency(combinationTotal, { currency: "USD" })}
            </motion.span>
          </span>
        )}
      </h3>
      <div className="bg-primary-light/50 p-4 rounded-lg border border-primary/20 min-h-[100px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {safeList.length > 0 ? (
            <motion.div
              key="pills"
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {safeList.map((product, index) => {
                const name = getProductName(product);
                const price = getProductPrice(product);
                const priceText = formatCurrency(price, { currency: "USD" });
                const key = getProductKey(product, index);
                return (
                  <motion.div
                    key={key}
                    className="bg-green-200 border border-green-300 text-green-800 font-medium rounded-full px-3 py-1 flex items-center gap-2 text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.07 }}
                  >
                    <span>{name}</span>
                    <span className="font-mono text-green-600">
                      {priceText}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className="text-center text-text-secondary py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Calculator className="text-5xl text-gray-300 mx-auto" />
              <p className="mt-2">
                {hasBudget
                  ? "No hay combinación posible."
                  : "Ingresa un presupuesto."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
