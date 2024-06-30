import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert, 
} from "react-native";
import { GreenButton, HeaderSimple, SafeAreaView } from "../components";
import Menu from "../components/Menu";
import { useAuth } from "../contexts/auth.context";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { TextInputMask } from 'react-native-masked-text';

export function AppointmentRegister() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    local: "",
    doctor: "",
    dateConsulta: "",
    dateLembrete: "",
  });

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
    Alert.alert(
      "Dados da Consulta",
      `Local: ${appointmentData.local}\nMédico(a): ${appointmentData.doctor}\nData da Consulta: ${appointmentData.dateConsulta}\nData do Lembrete: ${appointmentData.dateLembrete}`,
      [
        {
          text: "OK",
          onPress: () => {
            setAppointmentData({
              local: "",
              doctor: "",
              dateConsulta: "",
              dateLembrete: "",
            });
          },
        },
      ]
    );
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
                value={appointmentData.dateConsulta}
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
                value={appointmentData.dateLembrete}
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
      <Modal
        visible={menuVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeMenu}
      >
        <Menu onCloseMenu={closeMenu} />
      </Modal>
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
});
