type TableProps = {
  columns: { key: string; label: string; class?: string }[];
  rowsData: any[];
  actions?: { label: string; event: () => void }[];
  children: any;
  classname?: string;
};

const LargeTable: React.FC<TableProps> = ({
  columns,
  children,
  classname = "",
}) => {
  return (
    <div className={`rounded-lg ${classname} w-full border border-gray-900`}>
      <ul className="py-6 h-16 flex items-center justify-between bg-[#232427] px-2">
        {columns.map((column, i) => (
          <li key={i} className={column.class + " text-base font-normal"}>
            {column.label}
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
};

export default LargeTable;
