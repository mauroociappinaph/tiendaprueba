import React from "react";
import { BudgetOptimizerProps } from "./../types";
import { Card } from "./Card";
import { BestCombinationList } from "./BestCombinationList";

export const BudgetOptimizer: React.FC<BudgetOptimizerProps> = ({
  budget,
  onBudgetChange,
  bestCombination,
}) => {
  const [inputValue, setInputValue] = React.useState<string>(
    typeof budget === "number" ? String(budget) : "",
  );
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setInputValue(typeof budget === "number" ? String(budget) : "");
  }, [budget]);

  const handleBudgetChange = (value: string) => {
    setInputValue(value);
    // Permitir vacío para que el usuario borre y vuelva a escribir
    if (value.trim() === "") {
      setError(null);
      onBudgetChange(null);
      return;
    }
    const parsed = Number(value);
    if (Number.isNaN(parsed) || parsed < 0) {
      setError("Ingresa un número válido (>= 0)");
      return;
    }
    setError(null);
    onBudgetChange(parsed);
  };

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
              value={inputValue}
              onChange={(e) => handleBudgetChange(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg py-2 pl-7 pr-4 text-text-primary focus:ring-primary focus:border-primary transition font-mono"
              placeholder="e.g., 150"
            />
            {error && <p className="mt-2 text-sm text-danger">{error}</p>}
          </div>
        </div>

        {/* Columna 2: Combinación Óptima */}
        <BestCombinationList
          bestCombination={bestCombination}
          hasBudget={Number(inputValue) > 0}
        />
      </div>
    </Card>
  );
};
