import { memo, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useScraping } from "../../hooks/useScraping";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../types/user";
import Accordeon from "../../components/Accordeon/Accordeon";

const SelectAccordeon: React.FC<{ users: IUser[] }> = memo(({ users }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  console.log("algo");

  const navigate = useNavigate();

  const handleClickUser = (index: number) => {
    if (index != selectedIndex) {
      setSelectedIndex(index);
    } else {
      setSelectedIndex(null);
    }
  };

  const handleClickShop = (store_id: string) => {
    navigate(`/scraping/${store_id}`);
  };

  return users.map((user, i) =>
    user.stores.length > 0 ? (
      <Accordeon
        key={i}
        displayed={selectedIndex == i}
        label={user.username}
        onClick={() => handleClickUser(i)}
      >
        {user.stores.map((store) => (
          <button
            key={store._id}
            className="w-full bg-[#414249] py-2 text-left px-6 hover:bg-zinc-800"
            onClick={() => handleClickShop(store._id)}
          >
            {store.alias}
          </button>
        ))}
      </Accordeon>
    ) : (
      <></>
    )
  );
});

const SelectShop: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { getUsers } = useAuth();
  const { getScrapingProgress } = useScraping();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const progress = await getScrapingProgress();
      if (
        progress?.scrapingProgress.status == "running" &&
        progress?.scrapingProgress.targetStore
      ) {
        navigate(`/scraping/${progress?.scrapingProgress.targetStore}`);
      } else {
        const response = await getUsers();
        if (response) {
          setUsers(response);
        }
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="basicContainer">
      <span className="titlePageContainer">
        <h2>Seleccione una tienda</h2>
      </span>
      <div className="flex flex-col w-4/5 mt-8">
        <SelectAccordeon users={users} />
      </div>
    </div>
  );
};

export default SelectShop;
