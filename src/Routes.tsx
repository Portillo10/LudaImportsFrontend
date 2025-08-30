import { Outlet, Route, Routes } from "react-router-dom";

import Layout from "./layouts/Layout";
//Pages
import LogIn from "./pages/LogIn/LogIn";
import Users from "./pages/Users/Users";
import UsersInfo from "./pages/Users/UsersInfo";
import LinkStore from "./pages/Stores/LinkStore";
import StoresPage from "./pages/Stores/StoresPage";
import Publisher from "./pages/Publisher/Publisher";
import CalcPrice from "./pages/CalcPrice/CalcPrice";
import LinkSuccess from "./pages/Stores/LinkSuccess";
import SelectShop from "./pages/Scraping/SelectShop";
import WithSideBarLayout from "./layouts/WithSideBar";
import RegisterUser from "./pages/Users/RegisterUser";
import ScrapingPage from "./pages/Scraping/ScrapingPage";
import UpdatePrices from "./pages/UpdatePrices/UpdatePrices";
import PendingPosting from "./pages/Publisher/PendingPosting";
import StoreDashboard from "./pages/Stores/Dashboard";
import ItemsPage from "./pages/Stores/Items";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<LogIn />} />
        <Route path="/link-success" element={<LinkSuccess />} />
        <Route path="/" element={<WithSideBarLayout />}>
          <Route path="/scraping" element={<Outlet />}>
            <Route path="/scraping" element={<SelectShop />} />
            <Route path="/scraping/:store_id" element={<ScrapingPage />} />
          </Route>
          <Route path="/publisher" element={<Outlet />}>
            <Route path="/publisher" element={<Publisher />} />
            <Route path="/publisher/pending" element={<PendingPosting />} />
          </Route>
          <Route path="/calc-price" element={<CalcPrice />} />
          <Route path="/update-prices" element={<UpdatePrices />} />
          <Route path="/stores" element={<Outlet />}>
            <Route path="/stores" element={<StoresPage />} />
            <Route path="/stores/link" element={<LinkStore />} />
            <Route
              path="/stores/:store_id/items"
              element={<ItemsPage pageIndex={1} />}
            />
            <Route
              path="/stores/:store_id/dashboard"
              element={<StoreDashboard />}
            />
          </Route>
          <Route path="/users" element={<Outlet />}>
            <Route path="/users" element={<Users />} />
            <Route path="/users/:user_id" element={<UsersInfo />} />
            <Route
              path="/users/store/:store_id"
              element={<StoreDashboard pageIndex={4} />}
            />
            <Route path="/users/register" element={<RegisterUser />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
