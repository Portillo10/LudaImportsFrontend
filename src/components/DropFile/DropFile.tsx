import { ChangeEvent, useRef, useState } from "react";

type DropFileInputProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const DropFileInput: React.FC<DropFileInputProps> = ({ onChange }) => {
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
    // e.preventDefault();
    console.log("ondrop");

    const file = e.dataTransfer.files[0];
    console.log(file.name);
  };

  return (
    <div
      onDrop={onDrop}
      onDragOver={() => setActive(true)}
      onDragLeave={onDragLeave}
      className={`drop-area ${active && "activeDrop"}`}
    >
      <h2 className="">
        {active ? "Suelta para subir el archivo" : "Arrastra tu archivo aquí"}
      </h2>
      <p>O</p>
      <button
        onClick={() => {
          onClick();
        }}
      >
        Carga tu archivo
      </button>
      <input ref={inputRef} hidden type="file" onChange={onChange} />
    </div>
  );
};

export default DropFileInput;
