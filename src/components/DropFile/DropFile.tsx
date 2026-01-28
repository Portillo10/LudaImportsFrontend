import { ChangeEvent, useRef, useState } from "react";
import UploadIcon from "../../assets/icons/UploadIcon.svg";

import "./styles.css";

type DropFileInputProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const DropFileInput: React.FC<DropFileInputProps> = ({
  onChange,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState<boolean>(false);

  const onClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onDragLeave = () => {
    setActive(false);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("ondrop");

    const file = e.dataTransfer.files[0];
    console.log(file.name);
  };

  return (
    <div
      onClick={onClick}
      onDropCapture={onDrop}
      onDragOver={() => setActive(true)}
      onDragLeave={onDragLeave}
      className={`drop-area ${active && "activeDrop"} ${className}`}
    >
      <img src={UploadIcon} width={42} alt="" />
      <h2>Sube tus links</h2>
      <p className="">
        {active ? "Suelta para subir el archivo" : "Selecciona un archivo"}
      </p>
      <input ref={inputRef} hidden type="file" onChange={onChange} />
    </div>
  );
};

export default DropFileInput;
