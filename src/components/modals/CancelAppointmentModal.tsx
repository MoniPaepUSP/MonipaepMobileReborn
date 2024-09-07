import React, { useState } from "react";
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
import { Picker } from "@react-native-picker/picker";

interface CancelAppointmentModalProps {
  visible: boolean;
  appointmentDate: string;
  appointmentId: string;
  onClose: () => void;
}

export default function CancelAppointmentModal({
  visible,
  appointmentDate,
  appointmentId,
  onClose,
}: CancelAppointmentModalProps): JSX.Element {
  const [isCancelled, setIsCancelled] = useState<boolean>(false);
  const [justification, setJustification] = useState<string>("");

  const handleCancelAppointment = async () => {
    // TODO: Call hook and send the justification motive
    setIsCancelled(true);
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
            <Text style={styles.cancelText}>
              Tem certeza que deseja cancelar a consulta agendada para{" "}
              {appointmentDate}? Uma nova consulta pode demorar a ser marcada.
            </Text>
            <View
              accessible={true}
              accessibilityLabel="Caixa de seleção. Marque o motivo do cancelamento"
              style={[
                styles.inputField,
                justification != null && { borderColor: colors.red },
              ]}
            >
              <Picker
                selectedValue={justification}
                style={{
                  height: 50,
                  width: "100%",
                  borderWidth: 1,
                  borderBottomColor: colors.black,
                }}
                onValueChange={(itemValue) => setJustification(itemValue)}
              >
                <Picker.Item
                  label="Selecione o motivo para o cancelamento"
                  value={null}
                />
                <Picker.Item
                  label="Problemas de saúde"
                  value="problemas_saude"
                />
                <Picker.Item
                  label="Compromissos inadiáveis"
                  value="compromissos_inadiaveis"
                />
                <Picker.Item
                  label="Dificuldades logísticas (transporte, distância)"
                  value="dificuldades_logisticas"
                />
                <Picker.Item
                  label="Não consigo comparecer no horário marcado"
                  value="inconveniencia_horario"
                />
                <Picker.Item label="Outros" value="outros" />
              </Picker>
            </View>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancelAppointment}
            >
              <Text style={styles.cancelTextButton}>Cancelar</Text>
            </TouchableOpacity>
            {isCancelled && (
              <View style={styles.successContainer}>
                <MaterialIcons
                  name="check-circle"
                  size={24}
                  color={colors.green}
                />
                <Text style={styles.successText}>
                  Consulta cancelada com sucesso!
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
    borderRadius: 10,
    backgroundColor: "white",
  },
  successContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginTop: 20,
  },
  modalContent: {
    padding: 30,
    alignItems: "center",
    gap: 20,
    marginTop: 30,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 50,
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

  cancelText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  cancelTextButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
    textAlign: "center",
  },

  cancelButton: {
    backgroundColor: colors.red,
    padding: 10,
    width: 200,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 10
  },
  inputField: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
  },
});
