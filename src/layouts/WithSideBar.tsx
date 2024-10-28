import { Navigate, Outlet } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import { useAuthStore } from "../store/AuthStore";
import { memo, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/Spinner/Spinner";

const WithSideBarLayout: React.FC = memo(() => {
  const { isAuthenticated } = useAuthStore();
  const { loading, checkToken } = useAuth();

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
      <SideBar />
      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  );
});

export default WithSideBarLayout;
