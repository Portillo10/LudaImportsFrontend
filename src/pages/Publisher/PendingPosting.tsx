import InProgressTable from "./Tables/InProgressPubsTable";
import PendingTable from "./Tables/PendingPubsTable";

function PendingPostingPage() {
  return (
    <div className="basicContainer pt-4">
      <div className="flex flex-col gap-4 w-full justify-center items-center">
        <InProgressTable />
        <PendingTable />
      </div>
    </div>
  );
}

export default PendingPostingPage;
