import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface ChatButtonProps extends TouchableOpacityProps {
  title: string;
}

export function ChatButton({ title, ...rest }: ChatButtonProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    height: 40,
    borderRadius: 5,
    borderColor: colors.blue,
    borderWidth: 2,
    justifyContent: "center",
    width: 180,
    // marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 6,
  },
  text: {
    fontSize: 12,
    color: "#000000",
    fontFamily: fonts.generic,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
