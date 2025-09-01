import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  isLoading?: boolean;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title = "¿Estás seguro?",
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-zinc-800 rounded-xl p-6 max-w-md w-full shadow-xl animate-fade-in">
        <h2 className="text-lg font-semibold text-white mb-2">{title}</h2>
        <p className="text-zinc-300 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            disabled={isLoading}
            onClick={onCancel}
            className={`px-4 py-2 rounded-md bg-gray-600 transition ${
              isLoading ? "opacity-50" : "hover:bg-gray-700 "
            }`}
          >
            {cancelLabel}
          </button>
          <button
            disabled={isLoading}
            onClick={onConfirm}
            className={`px-4 py-2 rounded-md bg-red-600 text-white transition ${
              isLoading ? "opacity-50" : "hover:bg-red-700 "
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
