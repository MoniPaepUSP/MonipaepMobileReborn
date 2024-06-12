import { User } from "./user.interface";

export interface Data {
  data: {
    User: User;
    AccessToken: object;
    token: string;
  };
}

export interface AuthContextData {
  signed: boolean;
  user: User | null;
  refreshToken: object | null;
  token: string;
  login(CPF: string, password: string): Promise<Data>;
  register(
    email: string,
    name: string,
    cpf: string,
    phone: string,
    workAddress: string,
    homeAddress: string,
    neighborhood: string,
    houseNumber: string,
    isHealthPlanSelected: boolean,
    birthdate: string,
    password: string,
    isAllowMessageSelected: boolean,
    gender: string
  );
  signOut(): void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
