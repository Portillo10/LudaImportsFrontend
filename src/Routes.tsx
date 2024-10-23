import { Outlet, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import LogIn from "./pages/LogIn/LogIn";
import WithSideBarLayout from "./layouts/WithSideBar";
import Publisher from "./pages/Publisher/Publisher";
import StoresPage from "./pages/Stores/StoresPage";
import LinkStore from "./pages/Stores/LinkStore";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={<WithSideBarLayout />}>
          <Route path="/stores" element={<Outlet />}>
            <Route path="/stores" element={<StoresPage />} />
            <Route path="/stores/link" element={<LinkStore />} />
          </Route>
          <Route path="/publisher" element={<Publisher />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
