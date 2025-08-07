import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ShoppingCart, Trash, Plus, Minus } from "lucide-react";
import { CartItem, CartProps } from "./../types";
import { Card } from "./Card";
import { Modal } from "./Modal";

export const Cart: React.FC<CartProps> = ({
  cartItems,
  total,
  onQuantityChange,
  onClearCart,
}) => {
  const [isClearCartModalOpen, setIsClearCartModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<CartItem | null>(null);

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -30, transition: { duration: 0.2 } },
  };

  const handleConfirmClearCart = () => {
    onClearCart();
    setIsClearCartModalOpen(false);
  };

  const handleConfirmDeleteItem = () => {
    if (itemToDelete) {
      onQuantityChange(itemToDelete.id, 0);
      setItemToDelete(null);
    }
  };

  return (
    <>
      <Card className="sticky top-8">
        {cartItems.length === 0 ? (
          <div className="text-center py-10 relative flex flex-col items-center justify-center">
            <ShoppingCart className="text-7xl text-gray-200" />
            <p className="text-text-secondary mt-4">Tu carrito está vacío.</p>
            <p className="text-sm text-gray-400">
              Añade productos para verlos aquí.
            </p>
          </div>
        ) : (
          <>
            <motion.ul
              layout
              className="space-y-3 my-4 max-h-[15rem] overflow-y-auto pr-3"
              style={{ scrollbarGutter: "stable" }}
            >
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.li
                    key={item.id}
                    layout
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex justify-between items-center bg-transparent p-3 rounded-md border border-border"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-text-primary">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            onQuantityChange(item.id, item.quantity - 1)
                          }
                          className="p-1.5 rounded-md bg-gray-100 text-text-secondary hover:bg-gray-200 transition-colors"
                          aria-label={`Disminuir cantidad de ${item.name}`}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-sm text-text-primary font-medium w-5 text-center tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onQuantityChange(item.id, item.quantity + 1)
                          }
                          className="p-1.5 rounded-md bg-gray-100 text-text-secondary hover:bg-gray-200 transition-colors"
                          aria-label={`Aumentar cantidad de ${item.name}`}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1 ml-3">
                      <p className="font-bold text-text-primary font-mono">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                      <button
                        onClick={() => setItemToDelete(item)}
                        className="text-text-secondary hover:text-danger transition-colors p-1"
                        aria-label={`Quitar ${item.name} del carrito`}
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
            <div className="border-t border-border pt-4">
              <div className="flex justify-between items-center text-xl font-bold mb-4">
                <span className="text-text-primary">Total:</span>
                <span className="text-primary font-mono">
                  ${total.toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setIsClearCartModalOpen(true)}
                className="w-full bg-transparent border-2 border-danger text-danger font-semibold py-2 px-4 rounded-lg hover:bg-danger hover:text-white focus:outline-none focus:ring-2 focus:ring-danger focus:ring-opacity-50 transition-colors flex items-center justify-center"
              >
                <Trash className="h-5 w-5 mr-2" />
                Vaciar Carrito
              </button>
            </div>
          </>
        )}
      </Card>

      <Modal
        isOpen={isClearCartModalOpen}
        onClose={() => setIsClearCartModalOpen(false)}
        onConfirm={handleConfirmClearCart}
        title="Vaciar Carrito"
        confirmButtonText="Sí, vaciar"
      >
        <p>
          ¿Estás seguro de que quieres eliminar todos los productos de tu
          carrito? Esta acción no se puede deshacer.
        </p>
      </Modal>

      <Modal
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleConfirmDeleteItem}
        title="Eliminar Producto"
        confirmButtonText="Sí, eliminar"
      >
        {itemToDelete && (
          <p>
            ¿Estás seguro de que quieres eliminar{" "}
            <strong>{itemToDelete.name}</strong> de tu carrito?
          </p>
        )}
      </Modal>
    </>
  );
};
