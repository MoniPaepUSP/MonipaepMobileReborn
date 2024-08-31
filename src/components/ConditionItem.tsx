import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import Checkbox from 'expo-checkbox';
import colors from '../styles/colors';

const ConditionItem = ({ description, onPress, isChecked }) => {
  return (
    <Pressable style={styles.condition} onPress={onPress}>
      <Text style={styles.conditionText}>{description}</Text>
      <View style={styles.divider} />
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={onPress}
        color={colors.green}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  condition: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    paddingHorizontal: 22
    // width: '100%'
  },
  conditionText: {
    fontWeight: '500',
  },
  divider: {
    flex: 0.1,
    height: 1,
    marginHorizontal: 8,
  },
  checkbox: {
    width: 16,
    height: 16,
    alignSelf: 'center',
  },
});

export default ConditionItem;
