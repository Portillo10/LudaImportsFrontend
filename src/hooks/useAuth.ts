import { useAuthStore } from "../store/AuthStore";
import authService from "../services/authService";
import { useState } from "react";
import { LogInRequest } from "../types/apiRequests";
import { useUserStore } from "../store/UserStore";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/tokenHelper";

export const useAuth = () => {
  const { login, isAuthenticated, logout } = useAuthStore();
  const { setUser, user } = useUserStore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const handleLogin = async (data: Partial<LogInRequest>) => {
    console.log(data);

    setLoading(true);
    try {
      const { access_token, user } = await authService.logIn(data);
      setUser(user);
      login(access_token);
      navigate("/publisher");
    } catch (err) {
      if (err instanceof Error) {
        if (isAxiosError(err) && err.response?.data.error) {
          setError(err.response.data.error);
        } else {
          setError(err.message);
        }
      } else {
        console.log(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    try {
      logout();
      navigate("/login");
    } catch (error) {}
  };

  const checkToken = async () => {
    setLoading(true);
    try {
      const token = getToken();
      if (token) {
        const response = await authService.getProfile();
        setUser(response.profile);
        login(token);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogin,
    handleLogout,
    checkToken,
    isAuthenticated,
    error,
    user,
    loading,
  };
};
