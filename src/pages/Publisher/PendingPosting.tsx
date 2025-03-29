import { useEffect, useState } from "react";
import { useStores } from "../../hooks/useStores";
import InProgressTable from "./Tables/InProgressPubsTable";
import PendingTable from "./Tables/PendingPubsTable";

function PendingPostingPage() {
  const [loadingInProgress, setLoadingInProgress] = useState<boolean>(true);
  const [inProgressPubs, setInProgressPubs] = useState<any[]>([]);
  const { getPostingProgress } = useStores();

  const getAndSetInProgressPubs = async () => {
    setLoadingInProgress(true);
    await updateInProgressPubs();
    setLoadingInProgress(false);
  };

  const updateInProgressPubs = async () => {
    const response = await getPostingProgress();

    if (response) setInProgressPubs(response.progress);
  };

  useEffect(() => {
    getAndSetInProgressPubs();
  }, []);

  return (
    <div className="basicContainer pt-4 pb-8">
      <div className="flex flex-col gap-4 w-full justify-center items-center">
        {inProgressPubs.length > 0 && (
          <InProgressTable
            inProgressPubs={inProgressPubs}
            loading={loadingInProgress}
            updatePubs={updateInProgressPubs}
          />
        )}
        <PendingTable onPublish={updateInProgressPubs} />
      </div>
    </div>
  );
}

export default PendingPostingPage;
