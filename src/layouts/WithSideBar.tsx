import { Navigate, Outlet } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import { memo, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/Spinner/Spinner";

const WithSideBarLayout: React.FC = memo(() => {
  const { loading, checkToken, isAuthenticated, user } = useAuth();

  useEffect(() => {
    checkToken();
  }, []);

  if (loading) {
    return (
      <div className="basicContainer justify-center">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="w-full h-screen flex bg-primary-default text-white">
      <SideBar role={user?.role || "seller"} />
      <div className="w-full max-h-full overflow-auto">
        <Outlet />
      </div>
    </div>
  );
});

export default WithSideBarLayout;
