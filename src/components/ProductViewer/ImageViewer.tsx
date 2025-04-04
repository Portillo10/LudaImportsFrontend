import { useState } from "react";
import { IProduct, Picture } from "../../types/product";
import DeleteIcon from "../../assets/icons/DeleteIcon.svg";
import Toast from "../Toast/Toast";

type ImageViewerProps = {
  pictures: Picture[];
  deleteImage: (product: Partial<IProduct>) => void;
};

const ImageViewer: React.FC<ImageViewerProps> = ({ pictures, deleteImage }) => {
  const [currentImg, setCurrentImg] = useState<string>(pictures[0].source);
  const [currentImgIndex, setCurrentImgIndex] = useState<number>(0);
  const [activeToast, setActiveToast] = useState<boolean>(false);
  const [messageToast, setMessageToast] = useState<string>("");
  const [toastType, setToastType] = useState<"error" | "success">("success");

  const changeCurrentImg = (src: string, index: number) => {
    setCurrentImg(src);
    setCurrentImgIndex(index);
  };

  const onDeleteImage = () => {
    if (pictures.length > 1) {
      const newImages = pictures.filter(
        (picture) => picture.source != currentImg
      );
      deleteImage({ pictures: newImages });

      if (currentImgIndex == 0) {
        setCurrentImg(pictures[1].source);
      } else {
        setCurrentImg(pictures[currentImgIndex - 1].source);
        setCurrentImgIndex(currentImgIndex - 1);
      }
    } else {
      setToastType("error");
      setMessageToast("Debe haber por lo menos una imágen");
      setActiveToast(true);
    }
  };

  return (
    <div className="flex gap-4">
      <section className="flex flex-col items-center gap-3">
        {pictures.map((picture, i) => (
          <span
            key={i}
            onMouseEnter={() => changeCurrentImg(picture.source, i)}
            className={`cursor-pointer border-2 transition-all p-1 rounded-sm ${currentImgIndex == i && " border-sky-500"}`}
          >
            <img
              style={{ width: "35px" }}
              className="object-cover rounded-sm"
              src={picture.source}
            />
          </span>
        ))}
      </section>
      <section className="flex relative h-min">
        <img
          style={{ width: "400px" }}
          className="rounded-sm h-min"
          src={currentImg}
          alt=""
        />
        <button
          onClick={onDeleteImage}
          className="absolute bottom-2 right-2 bg-red-600 p-1.5 flex gap-2 rounded-md hover:bg-red-800"
        >
          <img src={DeleteIcon} width={12} alt="" />
        </button>
      </section>
      {activeToast && (
        <Toast
          message={messageToast}
          onClose={() => setActiveToast(false)}
          type={toastType}
        />
      )}
    </div>
  );
};

export default ImageViewer;
