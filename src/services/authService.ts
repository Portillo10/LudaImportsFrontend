import { LogInRequest } from "../types/apiRequests";
import { LogInResponse, ProfileResponse } from "../types/apiResponses";
import apiClient from "./apiClient";

const auth = {
  async logIn(data: Partial<LogInRequest>): Promise<LogInResponse> {
    const response = await apiClient.post("/sign-in", data);
    const responseData: LogInResponse = response.data;
    return responseData;
  },

  async getProfile() {
    const response = await apiClient.get("/profile");
    const responseData: ProfileResponse = response.data;
    return responseData;
  },
};

export default auth;
