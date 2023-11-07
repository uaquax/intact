import { AccountType } from "src/entities/user.entity";

export type UserParams = {
  email: string;
  password: string;
  name?: string;
  username?: string;
  age?: number;
  account_type?: AccountType;
};
