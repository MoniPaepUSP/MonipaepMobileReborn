import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GreenButton, HeaderSimple, SafeAreaView } from "../components";
import Menu from "../components/Menu";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import MenuHandlerComponent from "../components/MenuHandlerComponent";
import { TextInput } from "react-native-paper";
import { DefaultTheme } from "react-native-paper";
import SucessModal from "../components/modals/SucessModal";
import { useNavigation } from "@react-navigation/native";

export function ChangePasswordPage(): JSX.Element {
  const navigation = useNavigation();

  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [secureTextEntryConfirm, setSecureTextEntryConfirm] =
    useState<boolean>(true);

  const [visible, setVisible] = useState<boolean>(false);

  const handleShowPassword = (field) => {
    if (field === "password") {
      setSecureTextEntry(!secureTextEntry);
    } else {
      setSecureTextEntryConfirm(!secureTextEntryConfirm);
    }
  };

  const handleChangePassword = () => {
    setVisible(!visible);
    setTimeout(() => navigation.navigate("Login" as never), 2000);
    return;
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
      accessible={true}
      accessibilityLabel="Atualizar Senha"
    >
      <HeaderSimple titleScreen="Atualizar Senha" />
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        scrollEventThrottle={16}
      >
        <View style={styles.container} accessible={true}>
          <View style={styles.formContainer}>
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
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <GreenButton
          onPress={() => setVisible(true)}
          accessibilityLabel="Botão para marcar confirmar a atualização da senha"
          title="Atualizar Senha"
        />
      </View>
      <SucessModal
        text="Senha atualizada com sucesso"
        sucessText="Prosseguir para a tela de login"
        visible={visible}
        onClose={handleChangePassword}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    width: "100%",
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 200,
  },
  icons: {
    padding: 20,
  },
  hr: {
    borderBottomColor: colors.gray_light2,
    borderBottomWidth: 1.5,
    marginTop: 15,
    marginBottom: 15,
  },
  bottom: {
    width: "100%",
    position: "absolute",
    bottom: 40,
    alignItems: "center",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginTop: 20,
    padding: 20,
  },
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};
