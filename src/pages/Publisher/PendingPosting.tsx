import { useEffect, useState } from "react";
import { useStores } from "../../hooks/useStores";
import InProgressTable from "./Tables/InProgressPubsTable";
import PendingTable from "./Tables/PendingPubsTable";

function PendingPostingPage() {
  const [loadingInProgress, setLoadingInProgress] = useState<boolean>(false);
  const [inProgressPubs, setInProgressPubs] = useState<any[]>([]);
  const { getPostingProgress } = useStores();

  const updatedInProgressPubs = async () => {
    setLoadingInProgress(true);
    const response = await getPostingProgress();
    console.log(response);

    if (response) setInProgressPubs(response.progress);
    setLoadingInProgress(false);
  };

  useEffect(() => {
    updatedInProgressPubs();
  }, []);

  return (
    <div className="basicContainer pt-4 pb-8">
      <div className="flex flex-col gap-4 w-full justify-center items-center">
        {inProgressPubs.length > 0 && (
          <InProgressTable
            inProgressPubs={inProgressPubs}
            loading={loadingInProgress}
            updatePubs={updatedInProgressPubs}
          />
        )}
        <PendingTable onPublish={updatedInProgressPubs} />
      </div>
    </div>
  );
}

export default PendingPostingPage;
