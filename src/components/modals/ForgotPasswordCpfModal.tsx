import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import fonts from "../../styles/fonts";
import colors from "../../styles/colors";
import Modal from "react-native-modal";
import { TextInput } from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";
import { DefaultTheme } from "react-native-paper";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useNavigation } from "@react-navigation/native";

interface ForgotPasswordCpfModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ForgotPasswordCpfModal({
  visible,
  onClose,
}: ForgotPasswordCpfModalProps): JSX.Element {
  const navigation = useNavigation();
  const [cpfValue, setCpfValue] = useState<string>("");
  const [canProcced, setCanProcced] = useState<boolean>(false);
  const cpfRef = useRef();
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [errorMessage, setErrorMessage] = useState("");

  // TODO: Make a proper hook for the cpf verification
  function checkIfUserExistsHook() {
    if (cpfValue.length < 8) {
      setErrorMessage("Confira se digitou o CPF corretamente");
    }
    setCanProcced(true);
  }

  // TODO: Correct this implementation, it only functions when us the first time trying to access
  function handleCheckSmsCode() {
    setCanProcced(false);
    navigation.navigate("ChangePasswordPage" as never);
    return;
  }

  return (
    <View>
      <Modal
        isVisible={visible}
        animationIn="slideInUp"
        onBackdropPress={onClose}
        backdropOpacity={0.3}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialIcons name="close" size={24} color="black" />
          </TouchableOpacity>
          {!canProcced ? (
            <View style={styles.modalContent}>
              <Text>Digite o seu CPF</Text>
              <TextInput
                label="CPF"
                outlineColor={colors.green}
                activeOutlineColor={colors.blue_dark1}
                theme={theme}
                style={{ width: Dimensions.get("window").width * 0.7 }}
                value={cpfValue}
                mode="outlined"
                maxLength={14}
                editable
                keyboardType="number-pad"
                right={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialIcons name="person-outline" size={24} />
                    )}
                  />
                }
                render={(props) => (
                  <TextInputMask
                    {...props}
                    type="cpf"
                    value={cpfValue}
                    ref={cpfRef}
                    onChangeText={(text) => {
                      props.onChangeText?.(text);
                      setCpfValue(text);
                    }}
                  />
                )}
              />
              {errorMessage && (
                <Text style={{ color: colors.red, fontSize: 12, marginTop: 5 }}>
                  {errorMessage}
                </Text>
              )}
              <TouchableOpacity
                style={styles.button}
                accessibilityLabel="Botão para prosseguir com o processo de recuperação de senha"
                onPress={checkIfUserExistsHook}
              >
                <Text style={styles.buttonText}>Prosseguir</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.modalContent}>
              <Text style={styles.titleSms}>
                Digite o código SMS de 6 dígitos enviado para o celular{" "}
                <Text style={{ color: colors.green }}>(11) 991606-0213</Text>{" "}
                cadastrado em sua conta
              </Text>
              <View style={styles.smsCodeContainer}>
                <CodeField
                  ref={ref}
                  {...props}
                  // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                  value={value}
                  onChangeText={setValue}
                  cellCount={6}
                  rootStyle={styles.codeFieldRoot}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  autoComplete="sms-otp"
                  testID="my-code-input"
                  renderCell={({ index, symbol, isFocused }) => (
                    <Text
                      key={index}
                      style={[styles.cell, isFocused && styles.focusCell]}
                      onLayout={getCellOnLayoutHandler(index)}
                    >
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  )}
                />
              </View>
              <TouchableOpacity
                style={styles.button}
                accessibilityLabel="Botão para confirmar o código recebido"
                onPress={handleCheckSmsCode}
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 30,
    borderRadius: 10,
    width: Dimensions.get("window").width * 0.88,
  },
  modalText: {
    fontSize: 15,
    fontFamily: fonts.generic,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 25,
  },
  button: {
    backgroundColor: colors.green,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.8,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.warning,
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1000,
    padding: 5,
  },
  modalContent: {
    padding: 30,
    alignItems: "center",
    gap: 20,
    marginTop: 30,
  },
  smsCodeContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
  },
  smsCodeBox: {
    width: 40,
    height: "auto",
    borderColor: colors.green,
    borderWidth: 1,
  },
  smsCodeText: {
    fontSize: 24,
    color: colors.black,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  hiddenInput: {
    opacity: 0,
    position: "absolute",
    height: 0,
    width: 0,
  },
  codeFieldRoot: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: colors.green,
    textAlign: "center",
  },
  focusCell: {
    borderColor: colors.blue_dark2,
  },
  titleSms: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};
