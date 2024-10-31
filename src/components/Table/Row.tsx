type RowProps = {
  rowData: any;
  columns: { key: string; label: string; class?: string }[];
  bgColor: string;
  rowClass: string;
};

const Row: React.FC<RowProps> = ({ columns, rowData, bgColor, rowClass }) => {
  return (
    <tr style={{ backgroundColor: bgColor }}>
      {columns.map((col, index) => (
        <td
          className={` border-[#5A5B60] py-1 ${index == 0 && "border-r"} ${rowClass} ${col.class}`}
          key={index}
        >
          {rowData[col.key]}
        </td>
      ))}
    </tr>
  );
};

export default Row;
