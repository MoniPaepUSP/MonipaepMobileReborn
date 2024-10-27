import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import fonts from "../../styles/fonts";
import colors from "../../styles/colors";
import Modal from "react-native-modal";

interface SucessModalProps {
  visible: boolean;
  text: string;
  sucessText: string;
  onClose: () => void;
}

export default function SucessModal({ visible, text, sucessText, onClose }: SucessModalProps): JSX.Element {
  return (
    <View>
      <Modal
        isVisible={visible}
        animationIn="slideInUp"
        onBackdropPress={onClose}
        backdropOpacity={0.3}
      >
        <View style={styles.modalContainer}>
          <Text>{text}</Text>
          <TouchableOpacity
            style={styles.button}
            accessibilityLabel="Botão para fechar o pop up"
            onPress={onClose}
          >
            <Text style={styles.buttonText}>{sucessText}</Text>
          </TouchableOpacity>
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
});
