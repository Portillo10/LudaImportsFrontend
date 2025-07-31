import {
  cutText,
  formatNumber,
  getResizedImageUrl,
} from "../../../utils/helpers";

import { ChevronRight, ChevronLeft } from "lucide-react";

type Item = {
  item_id: string;
  sku: string;
  title: string;
  price: number;
  images?: string[];
  thumbnailImages?: string[];
  state: "active" | "paused" | "inactive";
  productSku: string;
  itemPrice: number;
};

const statusColors: Record<string, string> = {};

const ItemsTable: React.FC<{
  items: Item[];
  page: number;
  onChangePage: (i: number) => void;
  className?: string;
}> = ({ items, page, onChangePage, className }) => {
  const onClickNext = () => {
    onChangePage(page + 1);
  };

  const onClickPrev = () => {
    if (page > 1) {
      onChangePage(page - 1);
    }
  };

  return (
    <div>
      <div
        className={`grid grid-cols-1 gap-1 overflow-y-auto scroll-container bg-[#44454b] rounded-t-lg p-1 ${className}`}
      >
        {items.map((item) => (
          <div
            key={item.item_id}
            className="grid grid-cols-[auto_1fr_auto] gap-4 items-center px-4 py-3 rounded-xl shadow-sm bg-[#1a1b1f]"
          >
            <div>
              <img
                src={
                  item.images
                    ? getResizedImageUrl(item.images[0])
                    : item.thumbnailImages
                      ? getResizedImageUrl(item.thumbnailImages[0])
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUcmLCO117IJOgKFUCKJHArA7qTYPUllDEV5FgEkyI_6VCragpyFcfkoWdazWv-Adg2aQ&usqp=CAU"
                }
                alt={item.title}
                className="w-20 h-20 object-contain rounded-md"
              />
            </div>

            <div className="flex flex-col justify-around">
              <h2 className="text-base text-wrap">
                {item.title ? cutText(item.title, 60) : ""}
              </h2>
              <p className="text-[11px] text-gray-300">ID: {item.item_id}</p>
              <p className="text-[11px] text-gray-300">
                SKU: {item.sku || item.productSku}
              </p>
              <p className="text-lg text-green-400">
                ${item.itemPrice ? formatNumber(item.itemPrice) : 0}
              </p>
            </div>

            <div className="flex justify-end w-36">
              <span
                className={`text-sm px-3 py-1 rounded-full font-medium capitalize ${
                  statusColors[item.state]
                }`}
              >
                {item.state}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[#1a1b1f] rounded-b-md flex py-1.5 items-center border-t-2 border-gray-500 justify-end">
        <button onClick={onClickPrev}>
          <ChevronLeft strokeWidth={3} size={30} />
        </button>
        <p>
          {" "}
          Página{" "}
          <span className="border-2 border-gray-500 rounded-sm px-2 py-1">
            {page}
          </span>
        </p>
        <button onClick={onClickNext}>
          <ChevronRight strokeWidth={3} size={30} />
        </button>
      </div>
    </div>
  );
};

export default ItemsTable;
