import { useState } from "react";

type RowProps = {
  rowData: any;
  columns: { key: string; label: string; class?: string }[];
  bgColor: string;
  rowClass: string;
  hoverColor?: string;
  onClick?: (data: any) => void;
};

const Row: React.FC<RowProps> = ({
  columns,
  rowData,
  bgColor,
  rowClass,
  hoverColor,
  onClick,
}) => {
  const [rowColor, setRowColor] = useState<string>(bgColor);

  const handleHover = () => {
    if (hoverColor && rowColor == bgColor) setRowColor(hoverColor);
    else if (rowColor == hoverColor) setRowColor(bgColor);
  };

  const handleClick = () => {
    if (onClick) {
      onClick(rowData);
    }
  };

  return (
    <tr
      onClick={handleClick}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      style={{ backgroundColor: rowColor }}
      className={`${rowClass}`}
    >
      {columns.map((col, index) => (
        <td
          className={`border-[#5A5B60] py-1 cursor-pointer ${col.class}`}
          key={index}
        >
          {rowData[col.key]}
        </td>
      ))}
    </tr>
  );
};

export default Row;
