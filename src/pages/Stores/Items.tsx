import { useEffect } from "react";
import { useSideBarStore } from "../../store/MenuStore";

const ItemsPage: React.FC<{ pageIndex: number }> = ({ pageIndex }) => {
  const { setCurrentIndexPage } = useSideBarStore();
  useEffect(() => {
    setCurrentIndexPage(pageIndex);
  }, []);
  return <div>ItemsPage</div>;
};

export default ItemsPage;
