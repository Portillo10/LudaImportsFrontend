import { Navigate, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import ShopIcon from "../../assets/icons/ShopIcon.svg";

const StoresPage: React.FC = () => {
  const { user } = useAuth();

  useEffect(() => {}, []);
  if (user) {
    if (user.stores.length == 0) {
      return <Navigate to="/stores/link" />;
    } else {
      return (
        <div className="basicContainer gap-8">
          <span className="titlePageContainer">
            <h2>Mis tiendas</h2>
            <NavLink
              to="/users/register"
              className="border border-[#A8C0C8] rounded-md px-3 text-center py-1 hover:bg-slate-600 transition flex items-center gap-2"
            >
              <img src={ShopIcon} alt="" width={24} />
              <p>Añadir tienda</p>
            </NavLink>
          </span>
        </div>
      );
    }
  }
};

export default StoresPage;
