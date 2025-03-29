import { NavLink, useNavigate } from "react-router-dom";
import AddUserIcon from "../../assets/icons/AddUserIcon.svg";
import { useEffect, useState } from "react";
import { IUser } from "../../types/user";
import Table from "../../components/Table/Table";
import { useAuth } from "../../hooks/useAuth";
import Spinner from "../../components/Spinner/Spinner";

const TableColumns = [
  {
    key: "username",
    label: "Nombre de usuario",
    class: "min-w-48",
  },
  {
    key: "storeCount",
    label: "Tiendas",
    class: "min-w-24",
  },
  {
    key: "createdAt",
    label: "Fecha de inicio",
    class: "min-w-44",
  },
];

const Users: React.FC = () => {
  const [rowsData, setRowsData] = useState<Partial<IUser>[]>([]);
  const [loadingTable, setLoadingTable] = useState<boolean>(true);
  const { getUsers } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const initUsers = async () => {
      const users = await getUsers();

      if (users && Array.isArray(users)) {
        setRowsData(users);
      }
      setLoadingTable(false);
    };
    initUsers();
  }, []);

  const onClickUser = (data: any) => {
    navigate(`/users/${data._id}`);
  };

  const showTable = () => {
    if (loadingTable) {
      return (
        <div className="py-10">
          <Spinner />
        </div>
      );
    } else if (rowsData.length > 0) {
      return (
        <div className="min-w-96 fade-in">
          <Table
            rowClass="cursor-pointer hover:bg-[#414249]"
            columns={TableColumns}
            rowsData={rowsData}
            onClickRow={onClickUser}
            rowHoverColor="#414249"
          />
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div className="basicContainer gap-10">
      <span className="titlePageContainer fade-in">
        <h2>Usuarios</h2>
        <NavLink
          to="/users/register"
          className="border border-[#A8C0C8] rounded-md px-3 text-center py-1 hover:bg-slate-600 transition flex items-center gap-2"
        >
          <img src={AddUserIcon} alt="" width={24} />
          <p>Registrar usuario</p>
        </NavLink>
      </span>
      {showTable()}
    </div>
  );
};

export default Users;
