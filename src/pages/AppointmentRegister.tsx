import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import Modal from 'react-native-modal';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert, 
} from "react-native";
import { GreenButton, HeaderSimple, SafeAreaView } from "../components";
import Menu from "../components/Menu";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { TextInputMask } from 'react-native-masked-text';
import { IAppointment } from "../interfaces/appointment.interface";
import { AppointmentMessage } from "../messages/appointment.message";

export function AppointmentRegister() {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const appointment: IAppointment = {
    local: '',
    doctor: '',
    consultDate: '',
    rememberDate: ''
  }; 
  const [appointmentData, setAppointmentData] = useState(appointment);

  const openMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleAppointments = () => {
    navigation.navigate("MyAppointments" as never);
  };

  const handleInputChange = (field, value) => {
    setAppointmentData({
      ...appointmentData,
      [field]: value,
    });
  };

  const handleCreateAppointment = () => {
    AppointmentMessage(appointmentData, () => {
      setAppointmentData(appointment)
    })
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderSimple titleScreen="Cadastrar Consulta" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.bodyUp}>
            <TouchableOpacity onPress={openMenu}>
              <MaterialIcons
                style={styles.icons}
                name="menu"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <View style={styles.textAPP}>
              <Text style={styles.appName}>MoniPaEp</Text>
            </View>
          </View>
          <View style={styles.inputsContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Local da Consulta</Text>
              <Ionicons name="location" size={24} color="black" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Local da Consulta"
                value={appointmentData.local}
                onChangeText={(text) => handleInputChange("local", text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Médico(a) Responsável</Text>
              <Ionicons name="person" size={24} color="black" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Médico(a)"
                value={appointmentData.doctor}
                onChangeText={(text) => handleInputChange("doctor", text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Data da Consulta</Text>
              <Ionicons name="calendar" size={24} color="black" style={styles.inputIcon} />
              <TextInputMask
                style={styles.input}
                placeholder="Data da Consulta"
                type={'datetime'}
                options={{
                  format: 'DD/MM/YYYY'
                }}
                value={appointmentData.consultDate}
                onChangeText={(text) => handleInputChange("dateConsulta", text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Data do Lembrete</Text>
              <Ionicons name="calendar" size={24} color="black" style={styles.inputIcon} />
              <TextInputMask
                style={styles.input}
                placeholder="Data do Lembrete"
                type={'datetime'}
                options={{
                  format: 'DD/MM/YYYY'
                }}
                value={appointmentData.rememberDate}
                onChangeText={(text) => handleInputChange("dateLembrete", text)}
              />
            </View>
          </View>
          <View style={styles.bottom}>
            <GreenButton
              accessibilityLabel="Botão de Cadastrar Consulta. Pressione para cadastrar uma nova consulta"
              title="Cadastrar Consulta"
              onPress={handleCreateAppointment}
            />
          </View>
        </View>
      </ScrollView>
      <View>
                <Modal
                    isVisible={menuVisible}
                    animationIn="slideInLeft"
                    animationOut="slideOutLeft"
                    onBackdropPress={closeMenu}
                    backdropOpacity={0.3}
                    style={styles.modalLeft}
                >
                    <Menu onCloseMenu={closeMenu} />
                </Modal>
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
  bodyUp: {
    width: "100%",
    height: Dimensions.get("window").height * 0.15,
    justifyContent: "center",
    paddingBottom: 15,
  },
  icons: {
    padding: 20,
  },
  appName: {
    fontFamily: fonts.appName,
    fontSize: 32,
    color: colors.blue,
  },
  textAPP: {
    alignItems: "center",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  inputsContainer: {
    marginTop: 80,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    position: 'absolute',
    top: -10,
    left: 12,
    backgroundColor: colors.white,
    paddingHorizontal: 4,
    fontSize: 12,
    color: colors.gray,
    zIndex: 1,
  },
  inputIcon: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 2,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.gray_light2,
    borderRadius: 8,
    padding: 12,
    paddingLeft: 40,
    fontSize: 16,
  },
  bottom: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  modalLeft: {
    justifyContent: 'flex-start',
    margin: 0,
},
});
