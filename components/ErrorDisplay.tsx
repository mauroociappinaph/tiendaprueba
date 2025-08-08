import React from "react";
import { ErrorDisplayProps } from "./../types";
import { AlertTriangle } from "lucide-react";

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  message = "No se pudieron cargar los productos.",
  onRetry,
}) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold flex items-center">
        <AlertTriangle className="inline mr-2 h-5 w-5" /> ¡Ocurrió un error!
      </strong>
      <span className="block sm:inline">{message}</span>
      <div className="mt-4">
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-danger text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
          >
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
};
