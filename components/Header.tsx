import React from "react";
import { motion } from "framer-motion";

export const Header: React.FC = () => {
  return (
    <motion.header
      className="text-center mb-14 relative"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1 className="text-4xl sm:text-6xl font-heading font-bold text-text-primary tracking-tight">
        Tienda de Prueba
      </h1>
      <p className="mt-3 text-base sm:text-lg text-text-secondary max-w-3xl mx-auto">
        Una experiencia de compra moderna. Explora productos, gestiona tu
        carrito y optimiza tu presupuesto al instante.
      </p>
    </motion.header>
  );
};
