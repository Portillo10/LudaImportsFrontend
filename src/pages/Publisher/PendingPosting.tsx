import { useEffect, useState } from "react";
import { useStores } from "../../hooks/useStores";
import InProgressTable from "./Tables/InProgressPubsTable";
import PendingTable from "./Tables/PendingPubsTable";

function PendingPostingPage() {
  const [loadingInProgress, setLoadingInProgress] = useState<boolean>(false);
  const [inProgressPubs, setInProgressPubs] = useState<any[]>([]);
  const { getPostingProgress } = useStores();

  const updatedPendingPubs = async () => {
    setLoadingInProgress(true);
    const response = await getPostingProgress();
    if (response) setInProgressPubs(response);
    setLoadingInProgress(false);
  };

  useEffect(() => {
    updatedPendingPubs();
  });

  return (
    <div className="basicContainer pt-4 pb-8">
      <div className="flex flex-col gap-4 w-full justify-center items-center">
        {inProgressPubs.length > 0 && (
          <InProgressTable
            inProgressPubs={inProgressPubs}
            loading={loadingInProgress}
            updatePubs={updatedPendingPubs}
          />
        )}
        <PendingTable onPublish={updatedPendingPubs} />
      </div>
    </div>
  );
}

export default PendingPostingPage;
