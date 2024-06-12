import React, { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import {
  AuthContextData,
  AuthProviderProps,
} from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { token, refreshToken, saveTokens, clearTokens } = useToken();

  async function login(CPF: string, password: string) {
    const response = await api.post("/patients/login", {
      CPF: CPF,
      password: password,
    });

    setUser(response.data.patient);
    saveTokens(response.data.token, response.data.refreshToken);
    api.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;

    return response;
  }

  async function register(
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
  ) {
    const response = await api.post("/patients/signup", {
      email: email,
      name: name,
      CPF: cpf,
      phone: phone,
      workAddress: workAddress,
      homeAddress: homeAddress,
      neighborhood: neighborhood,
      houseNumber: houseNumber,
      hasHealthPlan: isHealthPlanSelected,
      birthdate: birthdate,
      password: password,
      allowSMS: isAllowMessageSelected,
      gender: gender,
    });

    setUser(response.data.patient);
    saveTokens(response.data.token, response.data.refreshToken);
    api.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;

    return response;
  }

  async function signOut() {
    clearTokens();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, refreshToken, token, signOut, login, register, signed: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

function useToken() {
  const [token, setToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<object | null>(null);

  async function saveTokens(newToken: string, newRefreshToken: object) {
    setToken(newToken);
    setRefreshToken(newRefreshToken);

    await AsyncStorage.setItem("@MHAuth:accessToken", JSON.stringify(newToken));
    await AsyncStorage.setItem(
      "@MHAuth:refreshToken",
      JSON.stringify(newRefreshToken)
    );
  }

  async function clearTokens() {
    setToken("");
    setRefreshToken(null);

    await AsyncStorage.removeItem("@MHAuth:accessToken");
    await AsyncStorage.removeItem("@MHAuth:refreshToken");
  }

  return { token, refreshToken, saveTokens, clearTokens };
}
