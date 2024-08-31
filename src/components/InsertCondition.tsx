import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { useState, useEffect } from "react";
import { ISymptomCardProps } from "../interfaces/conditions.interface";
import { useSymptom } from "../contexts/symptom.context";
import ConditionItem from "./ConditionItem";
import {
  useSearchSymptom,
  useSearchComorbity,
  useSearchSpecialCondition,
} from "../hooks/condition.hook";
import { ConditionTypes } from "../interfaces/conditions.interface";

export function InsertCondition({ selectedItem, newFetch }) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [filteredConditions, setFilteredConditions] = useState<
    ISymptomCardProps[]
  >([]);
  const [selectedConditions, setSelectedConditions] = useState([]);

  // Make hook for conditions and comorbities
  const { symptoms: searchSymptoms } = useSearchSymptom(searchTerm);
  const { comorbities: searchComorbity } = useSearchComorbity(searchTerm);
  const { specialConditions: searchSpecialConditions } =
    useSearchSpecialCondition(searchTerm);

  useEffect(() => {
    switch (selectedItem) {
      case ConditionTypes.COMORBITY:
        setFilteredConditions(searchComorbity);

        break;

      case ConditionTypes.SPECIAL_CONDITION:
        setFilteredConditions(searchSpecialConditions);

        break;
      case ConditionTypes.SYMPTOM:
        setFilteredConditions(searchSymptoms);

        break;
      default:
        setFilteredConditions([]);
        break;
    }
  }, [searchSymptoms, searchComorbity, searchSpecialConditions, newFetch]);

  const handlePlaceHolder = (selectedOption) => {
    switch (selectedOption) {
      case ConditionTypes.COMORBITY:
        return 'Comorbidade'

      case ConditionTypes.SPECIAL_CONDITION:
        return 'Condição Especial'
      case ConditionTypes.SYMPTOM:
        return 'Sintoma'
      default:
        return '';
    }
  };

  const handleConditionPress = (symptom) => {
    // Toggle selection based on current state
    const isSelected = selectedConditions.includes(symptom);
    if (isSelected) {
      setSelectedConditions(
        selectedConditions.filter((item) => item !== symptom)
      );
    } else {
      setSelectedConditions([...selectedConditions, symptom]);
    }
  };

  return (
    <View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={handlePlaceHolder(selectedItem)}
          placeholderTextColor="#ccc"
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={() => {}}
          returnKeyType="search"
        />
      </View>

      <View style={styles.optionsContainer}>
        {filteredConditions.map((symptom, index) => (
          <React.Fragment key={index}>
            <ConditionItem
              description={symptom.symptom}
              isChecked={selectedConditions.includes(symptom.symptom)}
              onPress={() => handleConditionPress(symptom.symptom)}
            />
            {index !== filteredConditions.length - 1 && (
              <View style={styles.hr} />
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    paddingHorizontal: 22,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.gray_light2,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    // marginRight: 10,
  },
  optionsContainer: {
    marginTop: 40,
  },
  hr: {
    borderBottomColor: colors.gray_light2,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});
