import axios, { AxiosInstance } from "axios";
import { getToken } from "../utils/tokenHelper";
import { useAuth } from "../hooks/useAuth";

// Crear una instancia de Axios
const apiClient: AxiosInstance = axios.create({
  baseURL: window.location.host.includes("localhost")
    ? "http://localhost:8000"
    : import.meta.env.VITE_API_URL, // La base URL de la API
  timeout: 10000, // Tiempo de espera para solicitudes
  // headers: {
  //   "Content-Type": "application/json",
  //   Authorization: `Bearer ${getToken()}`,
  // },
  withCredentials: true,
});

// Interceptor para agregar token de autorización a cada solicitud (si es necesario)
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log("Respuesta de la API:", response.status);
    // ✅ Todo OK, retornamos la respuesta
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status == 401) {
        const { handleLogout } = useAuth();
        handleLogout();
        console.error("Token expirado o inválido");
      }
    } else if (error.request) {
      console.error("No hubo respuesta del servidor", error.request);
    } else {
      console.error("Error en la configuración de la solicitud", error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
