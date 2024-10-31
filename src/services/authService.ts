import { LogInRequest } from "../types/apiRequests";
import {
  LogInResponse,
  ProfileResponse,
  RegisterUserResponse,
} from "../types/apiResponses";
import { IUser } from "../types/user";
import apiClient from "./apiClient";

const auth = {
  async logIn(data: Partial<LogInRequest>): Promise<LogInResponse> {
    const response = await apiClient.post("/sign-in", data);
    const responseData: LogInResponse = response.data;
    return responseData;
  },

  async registerUser(user: Partial<IUser>) {
    const response = await apiClient.post("/register-user", { user });
    const responseData: RegisterUserResponse = response.data;
    return responseData;
  },

  async getProfile() {
    const response = await apiClient.get("/profile");
    const responseData: ProfileResponse = response.data;
    return responseData;
  },

  async getUsers() {
    const response = await apiClient.get("/users");
    const responseData: Partial<IUser>[] = response.data;
    return responseData;
  },
};

export default auth;
