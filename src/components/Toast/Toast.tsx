import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import "./styles.css";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "warning";
  duration?: number;
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({
  message,
  type = "success",
  duration = 5000,
  onClose,
}) => {
  const [close, setClose] = useState<boolean>(false);
  useEffect(() => {
    const timer = setTimeout(async () => {
      setClose(true);
      onClose(); // Llama a onClose para ocultar el toast después de la duración
    }, duration);

    return () => {
      clearTimeout(timer);
    }; // Limpia el temporizador al desmontar
  }, [duration, onClose]);

  const onClickClose = () => {
    setClose(true);
    onClose();
  };

  return (
    <div className={`toast ${type} ${close ? "onclose" : ""}`}>
      <span>{message}</span>
      <button onClick={onClickClose}>
        <X></X>
      </button>
    </div>
  );
};

export default Toast;
