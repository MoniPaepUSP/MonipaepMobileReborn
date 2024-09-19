import React, { useState, useEffect, Fragment } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import fonts from "../styles/fonts";
import colors from "../styles/colors";
import Modal from "react-native-modal";

interface NewQuestionModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function NewQuestionModal({
  visible,
  onClose,
}: NewQuestionModalProps): JSX.Element {
  const [question, setQuestion] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const handleChangeQuestion = (text: string): void => {
    setQuestion(text);
    setError(false);
  };

  const handleSendQuestion = async (): Promise<void> => {
    const cleanQuestion = question.trim();
    if (cleanQuestion !== "") {
      // TODO: Call hook
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } else {
      setError(true);
    }
  };

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
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Faça a sua pergunta</Text>
            <TextInput
              style={[styles.input, error ? styles.inputError : null]}
              placeholder="Escreva aqui sua pergunta..."
              value={question}
              onChangeText={handleChangeQuestion}
            />
            {error && (
              <Text style={styles.errorText}>Por favor, preencha o campo</Text>
            )}
            <TouchableOpacity
              style={styles.button}
              accessibilityLabel="Botão para enviar a pergunta"
              onPress={handleSendQuestion}
            >
              <Text style={styles.buttonText}>Enviar Pergunta</Text>
            </TouchableOpacity>
            {success && (
              <View style={styles.successContainer}>
                <MaterialIcons
                  name="check-circle"
                  size={24}
                  color={colors.green}
                />
                <Text style={styles.successText}>
                  Pergunta enviada com sucesso!
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1000,
    padding: 5,
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  successContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginTop: 20,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 10,
    width: Dimensions.get("window").width * 0.88,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
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
  successText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
    textAlign: "center",
  },
});
