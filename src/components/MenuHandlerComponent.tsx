import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import Menu from "./Menu";

const MenuHandlerComponent = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  function openMenu() {
    setMenuVisible(true);
  }

  function closeMenu() {
    setMenuVisible(false);
  }

  return (
    <View style={styles.menuBox}>
      <View style={styles.bodyUp} accessible={true}>
        <TouchableOpacity onPress={openMenu}>
          <MaterialIcons
            style={styles.icons}
            name="menu"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <View style={styles.textAPP} accessible={true}>
          <Text style={styles.appName}>MoniPaEp</Text>
        </View>
      </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  menuBox: {
    width: "100%",
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
    fontWeight: "bold",
    fontSize: 32,
    color: colors.blue,
  },
  textAPP: {
    alignItems: "center",
  },
  menuButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 100,
  },
  modalLeft: {
    justifyContent: "flex-start",
    margin: 0,
  },
});

export default MenuHandlerComponent;
