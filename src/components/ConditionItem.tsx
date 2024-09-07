import React, { useState, useRef } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import Checkbox from "expo-checkbox";
import colors from "../styles/colors";
import TooltipComponent from "./TooltipComponent";
import { TouchableOpacity } from "react-native-gesture-handler";

const ConditionItem = ({ description, condition, onPress, isChecked }) => {
  const [tooltip, setTooltip] = useState(false);
  const itemRef = useRef(null);

  const handleActiveTooltip = () => {
    setTooltip(true);
  };

  const handleDesactiveTooltip = () => {
    setTimeout(() => setTooltip(false), 1000);
  };

  return (
    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
      {tooltip && (
        <View style={[{ top: -60, left: 50, width: itemRef.current?.width }]}>
          <TooltipComponent
            visible={tooltip}
            description={description}
            accessibilityLabel={`Descrição da condição ${condition}`}
          />
        </View>
      )}
      <Pressable
        ref={itemRef}
        style={styles.condition}
        onPress={onPress}
        onLongPress={handleActiveTooltip}
        onPressOut={handleDesactiveTooltip}
      >
        <View style={styles.conditionContainer}>
          <Text style={styles.conditionText}>{condition}</Text>
          <View style={styles.divider} />
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={onPress}
            color={colors.green}
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  condition: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
    backgroundColor: colors.gray_light3,
    padding: 25,
    width: "90%",
  },
  conditionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
    width: "100%",
  },
  conditionText: {
    fontWeight: "500",
  },
  divider: {
    flex: 0.1,
    height: 1,
    marginHorizontal: 8,
  },
  checkbox: {
    width: 16,
    height: 16,
    alignSelf: "center",
  },
});

export default ConditionItem;
