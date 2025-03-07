import InProgressTable from "./Tables/InProgressPubsTable";
import PendingTable from "./Tables/PendingPubsTable";

function PendingPostingPage() {
  return (
    <div className="basicContainer pt-4">
      <div className="flex flex-col gap-4 w-full items-center">
        <section className="w-full">
          <InProgressTable />
        </section>
        <section className="w-full">
          <PendingTable />
        </section>
      </div>
    </div>
  );
}

export default PendingPostingPage;
