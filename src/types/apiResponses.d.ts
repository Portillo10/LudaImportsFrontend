import { IStore } from "./store";
import { IUser } from "./user";

export interface LogInResponse {
  access_token: string;
  user: IUser;
  error?: string;
}

export interface ProfileResponse {
  profile: IUser;
}
