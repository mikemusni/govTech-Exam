import { User } from '../entities/user'

export interface createUserResponse {
  status: string | undefined;
  data?: Partial<User>;
  token?: string;
  errors?: string[];
}
