import React, { ReactNode, useRef, useEffect } from "react";
import "./styles.css";

interface ModalProps {
  title?: string; // Título opcional del modal
  isOpen: boolean; // Controla si el modal está abierto
  className?: string; // Clases personalizables para el modal
  children: ReactNode; // Contenido del modal
  onClose: () => void; // Función para cerrar el modal
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (event.target === dialog) {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <dialog ref={dialogRef} className={`modal ${className || ""}`}>
        <div className="w-full">
          <div className="modal-header">
            {title && <h2>{title}</h2>}
            <button onClick={onClose} className="modal-close">
              ×
            </button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
