import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface TooltipComponentProps {
  visible: boolean;
  description: string;
  accessibilityLabel?: string;
}

const TooltipComponent = ({
  visible,
  description,
  accessibilityLabel,
}: TooltipComponentProps) => {
  if (!visible) return null;

  return (
    <View style={styles.tooltipContainer}>
      <Text style={styles.tooltipText} accessibilityLabel={accessibilityLabel}>
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tooltipContainer: {
    position: "absolute",
    backgroundColor: colors.white,
    borderRadius: 4,
    padding: 20,
    elevation: 5,
    borderColor: colors.black
  },
  tooltipText: {
    fontFamily: fonts.text,
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.black,
  },
});

export default TooltipComponent;
