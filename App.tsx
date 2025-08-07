import React from "react";
import { Toaster } from "react-hot-toast";
import { motion, Variants } from "framer-motion";
import { Box, ShoppingCart, Calculator } from "lucide-react";
import { useProducts, useCart, useBudgetOptimizer } from "./hooks";
import {
  Header,
  ProductList,
  Cart,
  BudgetOptimizer,
  ProductListSkeleton,
  ErrorDisplay,
} from "./components";

const App: React.FC = () => {
  const {
    products,
    isLoading: isLoadingProducts,
    error,
    refetchProducts,
  } = useProducts();
  const { cartItems, total, addToCart, changeQuantity, clearCart } = useCart();
  const { budget, setBudget, bestCombination } = useBudgetOptimizer(products);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const renderProductList = () => {
    if (isLoadingProducts) {
      return <ProductListSkeleton />;
    }
    if (error) {
      return <ErrorDisplay message={error} onRetry={refetchProducts} />;
    }
    return <ProductList products={products} onAddToCart={addToCart} />;
  };

  return (
    <div className="min-h-screen bg-transparent text-text-primary font-body">
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#FFFFFF",
            color: "#1F2937",
            border: "1px solid #E5E7EB",
          },
          success: {
            iconTheme: {
              primary: "#22C55E",
              secondary: "#FFFFFF",
            },
          },
        }}
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <Header />

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <div className="mb-6">
              <div className="flex items-center mb-1">
                <Box className="h-6 w-6 mr-3 text-text-secondary" />
                <h2 className="text-2xl font-heading font-bold text-text-primary">
                  Productos Disponibles
                </h2>
              </div>
              <p className="text-text-secondary ml-9">
                Explora nuestra selección de productos y añádelos a tu carrito.
              </p>
            </div>
            {renderProductList()}
          </motion.div>

          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <div className="mb-6">
              <div className="flex items-center mb-1">
                <ShoppingCart className="h-6 w-6 mr-3 text-text-secondary" />
                <h2 className="text-2xl font-heading font-bold text-text-primary">
                  Tu Carrito
                </h2>
              </div>
              <p className="text-text-secondary ml-9">
                Revisa los productos que has seleccionado.
              </p>
            </div>
            <Cart
              cartItems={cartItems}
              total={total}
              onQuantityChange={changeQuantity}
              onClearCart={clearCart}
            />
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <div className="mb-6">
            <div className="flex items-center mb-1">
              <Calculator className="h-6 w-6 mr-3 text-text-secondary" />
              <h2 className="text-2xl font-heading font-bold text-text-primary">
                Optimizador de Presupuesto
              </h2>
            </div>
            <p className="text-text-secondary ml-9">
              Encuentra la mejor combinación de productos sin exceder tu
              presupuesto.
            </p>
          </div>
          <BudgetOptimizer
            budget={budget}
            onBudgetChange={setBudget}
            bestCombination={bestCombination}
          />
        </motion.div>
      </main>
    </div>
  );
};

export default App;
