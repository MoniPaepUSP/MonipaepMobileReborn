import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { GreenButton, HeaderSimple, SafeAreaView } from "../components";
import colors from "../styles/colors";
import { useAuth } from "../contexts/auth.context";
import MenuHandlerComponent from "../components/MenuHandlerComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { View } from "react-native";
import { Switch } from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";
import { DefaultTheme } from "react-native-paper";
import { GenericInformationModal } from "../components/GenericInformationModal";
import SucessModal from "../components/modals/SucessModal";

export function EditProfileInfoPage() {
  const { user } = useAuth();

  const [cpfValue, setCpfValue] = useState(user.CPF);
  const cpfRef = useRef();
  const [dobValue, setDobValue] = useState(formatDate(user.birthdate));
  const dobRef = useRef();
  const [phoneValue, setPhoneValue] = useState(user.phone);
  const phoneRef = useRef();
  const [emailValue, setEmailValue] = useState(user.email);
  const emailRef = useRef();
  const [cepValue, setCepValue] = useState(user.homeAddress);
  const cepRef = useRef();
  const [neighborhoodValue, setNeighborhoodValue] = useState(user.neighborhood);
  const neighborhoodRef = useRef();
  const [numberValue, setNumberValue] = useState(String(user.houseNumber));
  const numberRef = useRef();

  // Receive notifications configuration from API
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);

  // Modal
  const [openSucessModal, setOpenSucessModal] = useState(false);


  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const toggleLocation = () => {
    setLocationEnabled(!locationEnabled);
  };

  function handleEdit() {
    // TO DO: Implement edit functionality
    console.log('AAAAAAAAAAAA')
    setOpenSucessModal(true);
  }


  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [secureTextEntryConfirm, setSecureTextEntryConfirm] =
    useState<boolean>(true);

  const handleShowPassword = (field) => {
    if (field === "password") {
      setSecureTextEntry(!secureTextEntry);
    } else {
      setSecureTextEntryConfirm(!secureTextEntryConfirm);
    }
  };

  function formatDate(date) {
    const userDate = new Date(date.toString());
    const day = String(userDate.getDate()).padStart(2, "0"); // Ensure two digits
    const month = String(userDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = userDate.getFullYear();

    return `${day}/${month}/${year}`;
  }  

  return (
    <SafeAreaView accessible={true} style={styles.safeArea}>
      <ScrollView>
        <HeaderSimple titleScreen="Alterar minhas informações" />
        <MenuHandlerComponent />

        <View style={styles.formContainer}>
          <TextInput
            label="CPF"
            outlineColor={colors.green}
            activeOutlineColor={colors.blue_dark1}
            theme={theme}
            value={cpfValue}
            mode="outlined"
            maxLength={14}
            disabled
            keyboardType="number-pad"
            right={
              <TextInput.Icon
                icon={() => <MaterialIcons name="person-outline" size={24} />}
              />
            }
            render={(props) => (
              <TextInputMask
                {...props}
                value={cpfValue}
                type="cpf"
                ref={cpfRef}
                onChangeText={(text) => {
                  props.onChangeText?.(text);
                  setCpfValue(text);
                }}
              />
            )}
          />
          <TextInput
            label="Data de Nascimento"
            mode="outlined"
            outlineColor={colors.green}
            activeOutlineColor={colors.blue_dark1}
            theme={theme}
            value={dobValue}
            disabled
            render={(props) => (
              <TextInputMask
                {...props}
                value={dobValue}
                type="datetime"
                ref={dobRef}
                onChangeText={(text) => {
                  props.onChangeText?.(text);
                  setDobValue(text);
                }}
              />
            )}
            right={
              <TextInput.Icon
                icon={() => (
                  <MaterialCommunityIcons
                    name="calendar-blank-outline"
                    size={24}
                  />
                )}
              />
            }
          />
          <TextInput
            outlineColor={colors.green}
            activeOutlineColor={colors.blue_dark1}
            theme={theme}
            label="Celular"
            value={phoneValue}
            render={(props) => (
              <TextInputMask
                {...props}
                value={phoneValue}
                type="cel-phone"
                ref={phoneRef}
                onChangeText={(text) => {
                  props.onChangeText?.(text);
                  setPhoneValue(text);
                }}
              />
            )}
            mode="outlined"
            maxLength={16}
            keyboardType="phone-pad"
            right={
              <TextInput.Icon
                icon={() => <MaterialIcons name="phone" size={24} />}
              />
            }
          />
          <TextInput
            label="Email"
            value={emailValue}
            outlineColor={colors.green}
            activeOutlineColor={colors.blue_dark1}
            theme={theme}
            mode="outlined"
            right={
              <TextInput.Icon
                icon={() => <MaterialIcons name="email" size={24} />}
              />
            }
          />
          <TextInput
            label="CEP"
            value={cepValue}
            outlineColor={colors.green}
            activeOutlineColor={colors.blue_dark1}
            theme={theme}
            render={(props) => (
              <TextInputMask
                {...props}
                value={cepValue}
                type="zip-code"
                ref={cepRef}
                onChangeText={(text) => {
                  props.onChangeText?.(text);
                  setCepValue(text);
                }}
              />
            )}
            mode="outlined"
            maxLength={9}
            keyboardType="number-pad"
            right={
              <TextInput.Icon
                icon={() => (
                  <MaterialIcons name="person-pin-circle" size={24} />
                )}
              />
            }
          />
          <TextInput
            label="Endereço"
            outlineColor={colors.green}
            activeOutlineColor={colors.blue_dark1}
            theme={theme}
            value={neighborhoodValue}
            mode="outlined"
            right={
              <TextInput.Icon
                icon={() => (
                  <MaterialIcons name="person-pin-circle" size={24} />
                )}
              />
            }
          />

          <TextInput
            label="Numero"
            outlineColor={colors.green}
            activeOutlineColor={colors.blue_dark1}
            theme={theme}
            value={numberValue}
            mode="outlined"
            maxLength={10}
            keyboardType="number-pad"
            right={
              <TextInput.Icon
                icon={() => (
                  <MaterialIcons name="person-pin-circle" size={24} />
                )}
              />
            }
          />
          <TextInput
            label="Senha"
            outlineColor={colors.green}
            activeOutlineColor={colors.blue_dark1}
            theme={theme}
            mode="outlined"
            secureTextEntry={secureTextEntry}
            maxLength={12}
            onChangeText={(text) => console.log(text)}
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() => handleShowPassword("password")}
              />
            }
          />

          <TextInput
            label="Confirme a senha"
            outlineColor={colors.green}
            activeOutlineColor={colors.blue_dark1}
            theme={theme}
            mode="outlined"
            secureTextEntry={secureTextEntryConfirm}
            maxLength={12}
            onChangeText={(text) => console.log(text)}
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() => handleShowPassword("confirm")}
              />
            }
          />
          <View style={styles.switchContainer}>
            <Text>Ativar Notificações</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
              color={colors.blue_dark1}
            />
          </View>
          <View style={styles.switchContainer}>
            <Text>Ativar Localização</Text>
            <Switch
              value={locationEnabled}
              onValueChange={toggleLocation}
              color={colors.blue_dark1}
            />
          </View>
        </View>
        <View style={styles.greenButton} >
          {/* TODO: Problemas ao clicar nesse botão */}
          <GreenButton
            accessibilityLabel="Botão. Clique para alterar dados"
            title="Editar Informações"
            onPress={handleEdit}
          />
        </View>
      </ScrollView>
      {openSucessModal && (
        <SucessModal
          text="Informações atualizadas com sucesso"
          sucessText="Ok"
          visible={openSucessModal}
          onClose={() => setOpenSucessModal(false)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  icons: {
    alignSelf: "center",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginTop: 20,
    padding: 20,
  },
  switchContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greenButton: {
    margin: 'auto',
    marginTop: 20
  }
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};