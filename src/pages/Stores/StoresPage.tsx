import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

const StoresPage: React.FC = () => {
  const { user } = useAuth();

  useEffect(() => {}, []);
  if (user) {
    if (user.stores.length == 0) {
      return <Navigate to="/stores/link" />;
    } else {
      return <div className="basicContainer gap-8"></div>;
    }
  }
};

export default StoresPage;
