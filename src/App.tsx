import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes></AppRoutes>
    </BrowserRouter>
  );
}

export default App;
