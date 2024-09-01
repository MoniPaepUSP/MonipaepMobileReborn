import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

const AppointmentItem = ({ appointment, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.infos}>Próxima Consulta</Text>
      <View style={styles.detailsContainer}>
        <Text>
          <Text style={styles.infosTypo1}>Local:</Text>
          <Text>{` ${appointment.local}`}</Text>
        </Text>
        <Text>
          <Text style={styles.infosTypo1}>Médico(a): </Text>
          <Text>{appointment.doctor}</Text>
        </Text>
        <Text>
          <Text style={styles.infosTypo1}>Data da Consulta: </Text>
          <Text>{appointment.dateConsulta}</Text>
        </Text>
        <Text>
          <Text style={styles.titleTypo}>Data do Lembrete: </Text>
          <Text style={styles.text1}>{appointment.dateLembrete}</Text>
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onPress(appointment)}
      >
        <Text style={styles.buttonText}>Alterar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 1, // For Android shadow
    shadowColor: colors.black, // For iOS shadow
    shadowOffset: { width: 0, height: 4 }, // For iOS shadow
    shadowOpacity: 0.1, // For iOS shadow
    shadowRadius: 8, // For iOS shadow
    // marginVertical: 8,
  },
  infos: {
    fontFamily: fonts.generic,
    fontWeight: "800",
    fontSize: 16,
    color: colors.black,
    marginBottom: 10,
  },
  infosTypo1: {
    fontFamily: fonts.generic,
    fontWeight: "bold",
  },
  titleTypo: {
    fontFamily: fonts.generic,
    fontWeight: "bold",
  },
  text1: {
    fontFamily: fonts.generic,
  },
  detailsContainer: {
    flex: 1,
  },
  button: {
    backgroundColor: colors.green,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.generic,
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default AppointmentItem;
