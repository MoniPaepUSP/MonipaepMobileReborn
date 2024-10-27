import { Alert } from "react-native";
import { IAppointment } from "../interfaces/appointment.interface";

export function AppointmentMessage(
  appointmentData: IAppointment,
  handleFunction: () => void
) {
  Alert.alert(
    "Dados da consulta",
    `Local: ${appointmentData.local}\nMédico(a): ${appointmentData.doctor}\nData da Consulta: ${appointmentData.consultDate}\nData do Lembrete: ${appointmentData.rememberDate}`,
    [
      {
        text: "Ok",
        onPress: handleFunction,
      },
    ]
  );
}