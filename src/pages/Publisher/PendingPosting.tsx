import { useEffect, useState } from "react";
import { useStores } from "../../hooks/useStores";

function PendingPosting() {
  const { getPendingPublications } = useStores();
  const [pendingPublications, setPendingPublications] = useState<any>([]);

  useEffect(() => {
    async () => {
      const response = await getPendingPublications();
      if (response) setPendingPublications(response);
    };
  }, []);
  return <div className="basicContainer">{pendingPublications}</div>;
}

export default PendingPosting;
