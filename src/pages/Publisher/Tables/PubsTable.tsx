import LargeTable from "../../../components/LargeTable/LargeTable";
import LargeRow from "../../../components/LargeTable/LargeRow";
import Menu from "../../../components/Menu/Menu";

type PubsTableProps = {
  pubs: any[];
  columns: { label: string; class: string; key: string; rowClass: string }[];
  activeMenuIndex: number;
  handleClickMenu: (index: number) => void;
  menuOptions: { label: string; click: (store_id: string) => Promise<void> }[];
};

const PubsTable: React.FC<PubsTableProps> = ({
  pubs,
  columns,
  menuOptions,
  activeMenuIndex,
  handleClickMenu,
}) => {
  return (
    <LargeTable columns={columns} rowsData={[]} classname="fade-in">
      {pubs.map((store, i) => (
        <LargeRow index={i} key={i}>
          {columns.map((column, j) => {
            if (column.key != "actions")
              return (
                <li
                  className={`${column.class} py-2 ${column.rowClass}`}
                  key={j}
                >
                  {store[column.key]}
                </li>
              );
            else
              return (
                <li
                  className={`${column.class}`}
                  key={j}
                  onClick={() => handleClickMenu(i)}
                >
                  <Menu
                    options={menuOptions}
                    store_id={store["_id"]}
                    active={i == activeMenuIndex}
                    classname={i == pubs.length - 1 ? "bottom-3" : "top-3"}
                  />
                </li>
              );
          })}
        </LargeRow>
      ))}
    </LargeTable>
  );
};

export default PubsTable;
