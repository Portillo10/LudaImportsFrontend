import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "linkData") {
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  return (
    <BrowserRouter>
      <AppRoutes></AppRoutes>
    </BrowserRouter>
  );
}

export default App;
