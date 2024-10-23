import { IUser } from "./user";

export interface LogInRequest {
  username: string;
  email: string;
  password: string;
}
