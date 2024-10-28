import { Outlet, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import LogIn from "./pages/LogIn/LogIn";
import WithSideBarLayout from "./layouts/WithSideBar";
import Publisher from "./pages/Publisher/Publisher";
import StoresPage from "./pages/Stores/StoresPage";
import LinkStore from "./pages/Stores/LinkStore";
import CalcPrice from "./pages/CalcPrice/CalcPrice";
import UpdatePrices from "./pages/UpdatePrices/UpdatePrices";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={<WithSideBarLayout />}>
          <Route path="/publisher" element={<Publisher />} />
          <Route path="/calc-price" element={<CalcPrice />} />
          <Route path="/update-prices" element={<UpdatePrices />} />
          <Route path="/stores" element={<Outlet />}>
            <Route path="/stores" element={<StoresPage />} />
            <Route path="/stores/link" element={<LinkStore />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
