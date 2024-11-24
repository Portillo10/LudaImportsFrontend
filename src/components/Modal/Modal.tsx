import React, { ReactNode, useRef, useEffect } from "react";
import "./styles.css";

interface ModalProps {
  isOpen: boolean; // Controla si el modal está abierto
  onClose: () => void; // Función para cerrar el modal
  title?: string; // Título opcional del modal
  children: ReactNode; // Contenido del modal
  className?: string; // Clases personalizables para el modal
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
        onClose();
      }
    };

    dialog.addEventListener("click", handleClickOutside);
    return () => {
      dialog.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* {isOpen && <div className="modal-overlay"></div>} */}
      <dialog ref={dialogRef} className={`modal ${className || ""}`}>
        <div className="w-full h-full py-3 px-6">
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
