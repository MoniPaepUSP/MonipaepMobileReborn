import React, { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import {
  ISymptomCardProps,
  SymptomProviderProps,
  SymptonsContextData,
} from "../interfaces/conditions.interface";
import { useAuth } from "./auth.context";

const SymptomContext = createContext<SymptonsContextData>(
  {} as SymptonsContextData
);

export const SymptomProvider: React.FC<SymptomProviderProps> = ({ children }) => {
  const { user } = useAuth();

  async function searchSymptom(search: string) {
    try {
      const response = await api.get("/symptom", {
        params: { symptom: search },
      });
      return response.data.symptoms;
    } catch (error) {
      console.log(error);
    }
  }

  //TODO: Após mudança no BD lidar melhor com isso
  async function setSymptom(symptoms: ISymptomCardProps[]) {
    try {
      const response = await api.post("/symptomoccurrence", {
        symptoms,
        patient_id: user.id,
      });
      return response ? true : false;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SymptomContext.Provider value={{ searchSymptom, setSymptom }}>
      {children}
    </SymptomContext.Provider>
  );
};

export function useSymptom() {
  const context = useContext(SymptomContext);
  return context;
}
