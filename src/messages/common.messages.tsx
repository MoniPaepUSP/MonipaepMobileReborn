import { Alert } from "react-native";

export function commonErrorAlert(message: string, handleFunction: () => void) {
  Alert.alert("Erro", message, [
    {
      text: "Prosseguir",
      onPress: handleFunction,
    },
  ]);
}

export function commonSucessAlert(message: string, handleFunction: () => void) {
  Alert.alert("Sucesso", message, [
    {
      text: "Prosseguir",
      onPress: handleFunction,
    },
  ]);
}
