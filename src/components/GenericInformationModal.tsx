import React, { ReactNode, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import Modal from "react-native-modal";

interface GenericInformationModalProps {
    description: string | ReactNode
    isComponent?: boolean | null
}

export function GenericInformationModal({
  description,
  isComponent,
}: GenericInformationModalProps) {
  const [showPopup, setShowPopup] = useState(false);

  const closeModal = () => {
    setShowPopup(false);
  };

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  return (
    <View>
      <Modal
        isVisible={showPopup}
        animationIn="slideInUp"
        onBackdropPress={closeModal}
        backdropOpacity={0.3}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {!isComponent ? (
              <Text style={styles.modalText}>{description}</Text>
            ) : (
              description
            )}
            <TouchableOpacity
              style={styles.button}
              accessibilityLabel="Botão para fechar o pop up"
              onPress={closeModal}
            >
              <Text style={styles.buttonText}>Estou Ciente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 10,
    width: Dimensions.get("window").width * 0.88,
    alignItems: "center",
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
