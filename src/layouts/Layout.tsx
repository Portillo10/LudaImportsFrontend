import { Outlet } from "react-router-dom";
import Header from "../components/Header";

interface ILayout {}

const Layout: React.FC<ILayout> = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center bg-primary-default text-white">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
