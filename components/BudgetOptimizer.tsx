import React from "react";
import { Calculator } from "lucide-react";
import { BudgetOptimizerProps } from "./../types";
import { Card } from "./Card";
import { motion, AnimatePresence } from "framer-motion";

export const BudgetOptimizer: React.FC<BudgetOptimizerProps> = ({
  budget,
  onBudgetChange,
  bestCombination,
}) => {
  const combinationTotal = bestCombination.reduce(
    (sum, product) => sum + product.price,
    0
  );

  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
        {/* Columna 1: Presupuesto */}
        <div className="md:col-span-2">
          <label
            htmlFor="budget"
            className="block text-sm font-bold text-text-primary mb-2"
          >
            Presupuesto Máximo:
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-secondary font-mono">
              $
            </span>
            <input
              type="number"
              id="budget"
              value={budget}
              onChange={(e) => onBudgetChange(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg py-2 pl-7 pr-4 text-text-primary focus:ring-primary focus:border-primary transition font-mono"
              placeholder="e.g., 150"
            />
          </div>
        </div>

        {/* Columna 2: Combinación Óptima */}
        <div className="md:col-span-3">
          <h3 className="text-lg font-bold text-text-primary mb-2 flex justify-between items-baseline">
            <span>Combinación Óptima</span>
            {bestCombination.length > 0 && (
              <span className="text-base font-medium text-text-secondary">
                Total:{" "}
                <span className="text-primary font-bold font-mono text-lg">
                  $
                  {combinationTotal.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </span>
            )}
          </h3>
          <div className="bg-primary-light/50 p-4 rounded-lg border border-primary/20 min-h-[100px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {bestCombination.length > 0 ? (
                <motion.div
                  key="pills"
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {bestCombination.map((product, index) => (
                    <motion.div
                      key={product.id}
                      className="bg-green-200 border border-green-300 text-green-800 font-medium rounded-full px-3 py-1 flex items-center gap-2 text-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.07 }}
                    >
                      <span>{product.name}</span>
                      <span className="font-mono text-green-600">
                        ${product.price.toFixed(2)}
                      </span>
                    </motion.div>
                  ))}
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
                    {Number(budget) > 0
                      ? "No hay combinación posible."
                      : "Ingresa un presupuesto."}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Card>
  );
};
