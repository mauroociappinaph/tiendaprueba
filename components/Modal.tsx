import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { AlertCircle, X } from "lucide-react";
import { ModalProps } from "./../types";
import { lockBodyScroll, unlockBodyScroll } from "../utils/scrollLock";

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  confirmButtonText = "Confirmar",
  cancelButtonText = "Cancelar",
}) => {
  const modalRef = React.useRef<HTMLDivElement | null>(null);
  const previouslyFocusedElementRef = React.useRef<HTMLElement | null>(null);
  const contentId = React.useId();

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

  React.useLayoutEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "Tab" && modalRef.current) {
        const focusableSelectors = [
          "a[href]",
          "button:not([disabled])",
          "textarea:not([disabled])",
          "input:not([disabled])",
          "select:not([disabled])",
          '[tabindex]:not([tabindex="-1"])',
        ].join(",");
        const nodeList =
          modalRef.current.querySelectorAll<HTMLElement>(focusableSelectors);
        const focusableElements: HTMLElement[] = Array.from(nodeList);
        const visibleFocusableElements: HTMLElement[] =
          focusableElements.filter(
            (el: HTMLElement) =>
              !el.hasAttribute("disabled") && el.offsetParent !== null,
          );

        if (visibleFocusableElements.length === 0) {
          return;
        }

        const firstEl: HTMLElement = visibleFocusableElements[0];
        const lastEl: HTMLElement =
          visibleFocusableElements[visibleFocusableElements.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (!event.shiftKey && active === lastEl) {
          event.preventDefault();
          firstEl.focus();
        } else if (event.shiftKey && active === firstEl) {
          event.preventDefault();
          lastEl.focus();
        }
      }
    };

    if (!isOpen) {
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }

    // Guardar foco previo y bloquear scroll del body
    previouslyFocusedElementRef.current =
      document.activeElement as HTMLElement | null;
    lockBodyScroll();

    // Enfocar el primer elemento interactivo dentro del modal
    requestAnimationFrame(() => {
      if (!modalRef.current) return;
      const focusableSelectors = [
        "button:not([disabled])",
        "a[href]",
        "input:not([disabled])",
        "select:not([disabled])",
        "textarea:not([disabled])",
        '[tabindex]:not([tabindex="-1"])',
      ].join(",");
      const nodeList =
        modalRef.current.querySelectorAll<HTMLElement>(focusableSelectors);
      const first = Array.from(nodeList)[0] as HTMLElement | undefined;
      if (first) {
        first.focus();
      } else {
        modalRef.current.focus();
      }
    });

    const handleFocusIn = (e: FocusEvent) => {
      if (!modalRef.current) return;
      if (!modalRef.current.contains(e.target as Node)) {
        // Si el foco intenta salir, re-dirigir al modal
        const focusableSelectors = [
          "button:not([disabled])",
          "a[href]",
          "input:not([disabled])",
          "select:not([disabled])",
          "textarea:not([disabled])",
          '[tabindex]:not([tabindex="-1"])',
        ].join(",");
        const nodeList =
          modalRef.current.querySelectorAll<HTMLElement>(focusableSelectors);
        const first = Array.from(nodeList)[0] as HTMLElement | undefined;
        if (first) first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleFocusIn);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocusIn);
      // Restaurar scroll y foco
      unlockBodyScroll();
      previouslyFocusedElementRef.current?.focus();
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
            className="bg-surface rounded-2xl p-6 sm:p-8 border border-border shadow-2xl w-full max-w-md mx-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby={children ? contentId : undefined}
            ref={modalRef}
            tabIndex={-1}
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

            <div id={contentId} className="mt-4 text-text-secondary pl-14">
              {children}
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="bg-surface border-2 border-border text-text-primary font-semibold py-2 px-5 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors"
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
