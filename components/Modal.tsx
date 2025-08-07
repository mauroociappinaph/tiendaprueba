import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { AlertCircle, X } from "lucide-react";
import { ModalProps } from "./../types";

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  confirmButtonText = "Confirmar",
  cancelButtonText = "Cancelar",
}) => {
  const backdropVariants: Variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0, transition: { when: "afterChildren" } },
  };

  const modalVariants: Variants = {
    hidden: { y: "-50px", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
    exit: { y: "50px", opacity: 0, transition: { duration: 0.2 } },
  };

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          onClick={onClose}
        >
          <motion.div
            className="bg-surface rounded-2xl p-6 sm:p-8 border border-border shadow-2xl w-full max-w-md mx-4"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-danger/10 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-danger" />
                </div>
                <h2
                  id="modal-title"
                  className="text-xl font-heading font-bold text-text-primary ml-4"
                >
                  {title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-text-secondary hover:text-text-primary p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 text-text-secondary pl-14">{children}</div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="bg-white border-2 border-border text-text-primary font-semibold py-2 px-5 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors"
              >
                {cancelButtonText}
              </button>
              <button
                onClick={onConfirm}
                className="bg-danger border-2 border-danger text-white font-semibold py-2 px-5 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-danger focus:ring-opacity-50 transition-colors"
              >
                {confirmButtonText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
