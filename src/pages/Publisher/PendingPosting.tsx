import { useEffect, useState } from "react";
import { useStores } from "../../hooks/useStores";
import LargeTable from "../../components/LargeTable/LargeTable";
import LargeRow from "../../components/LargeTable/LargeRow";

const columns = [
  {
    key: "alias",
    label: "Tienda",
    class: "px-6 w-36",
  },
  {
    key: "publicatedProducts",
    label: "Productos publicados",
    class: "px-6 w-44 text-right leading-tight",
  },
  {
    key: "pendingProducts",
    label: "Publicaciones pendientes",
    class: "px-6 w-44 text-right leading-tight",
  },
];

function PendingPosting() {
  const { getPendingPublications } = useStores();
  const [pendingPublications, setPendingPublications] = useState<any[]>([]);

  useEffect(() => {
    async () => {
      const response = await getPendingPublications();
      if (response) setPendingPublications(response);
    };
  }, []);
  return (
    <div className="basicContainer pt-8">
      <LargeTable columns={columns} rowsData={[]}>
        {pendingPublications.map((store, i) => (
          <LargeRow index={i} key={i}>
            {columns.map((column) => (
              <li className={column.class}>{store[column.key]}</li>
            ))}
          </LargeRow>
        ))}
      </LargeTable>
    </div>
  );
}

export default PendingPosting;
