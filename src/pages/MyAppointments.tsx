import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert, // Importar ScrollView
} from "react-native";
import { HeaderSimple, SafeAreaView } from "../components";
import colors from "../styles/colors";
import AppointmentItem from "../components/AppointmentItem";
import MenuHandlerComponent from "../components/MenuHandlerComponent";

// TODO: Add modal to change or cancel the appointment

export function MyAppointments() {

  const handleAppointmentChange = (appointment) => {
    Alert.alert(
      "Informações da Consulta",
      `Local: ${appointment.local}\nMédico(a): ${appointment.doctor}\nData da Consulta: ${appointment.dateConsulta}\nData do Lembrete: ${appointment.dateLembrete}`
    );
  };

  const appointments = [
    {
      id: 1,
      local:
        "R. Dr. João Navarro Siquerolli, s/n - Parque Santa Felicia Jardim, São Carlos - SP, 13563-714",
      doctor: "Doutora Simone",
      dateConsulta: "12/05/2020",
      dateLembrete: "10/05",
    },
    {
      id: 2,
      local:
        "R. Dr. João Navarro Siquerolli, s/n - Parque Santa Felicia Jardim, São Carlos - SP, 13563-714",
      doctor: "Doutora Simone Cópia",
      dateConsulta: "13/05/2020",
      dateLembrete: "11/05",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderSimple titleScreen="Atualizar Sintomas" />
      <View style={styles.container}>
        <MenuHandlerComponent />
        <ScrollView style={styles.scrollView}>
          {appointments.map((appointment, index) => (
            <View key={appointment.id}>
              <AppointmentItem
                appointment={appointment}
                onPress={handleAppointmentChange}
              />
              {index < appointments.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
  },
  bottom: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  greenButton: {
    width: Dimensions.get("window").width * 0.9,
  },

  scrollView: {
    flex: 1,
  },
  divider: {
    borderColor: colors.gray_light1,
    borderTopWidth: 1,
    marginVertical: 5,
  },
  modalLeft: {
    justifyContent: "flex-start",
    margin: 0,
  },
});
