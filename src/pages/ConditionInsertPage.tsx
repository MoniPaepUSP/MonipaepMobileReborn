import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { BlueButton, HeaderSimple, SafeAreaView } from '../components';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import Menu from '../components/Menu';
import CustomSelect from '../components/CustomSelect';
import ConditionItem from '../components/ConditionItem';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import Modal from 'react-native-modal';
import { InsertCondition } from '../components/InsertCondition';
import MenuHandlerComponent from '../components/MenuHandlerComponent';

export function ConditionInsertPage() {
    const navigation = useNavigation();
    // TODO: The default should be received by props
    const [selectedOption, setSelectedOption] = useState("symptom");
    const [newFetch, setNewFetch] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState("");
    // Banco de dados
    const [records, setRecords] = useState([
        { id: 1, type: "Sintoma", description: "Dor de cabeça", isChecked: false },
        { id: 2, type: "Sintoma", description: "Febre", isChecked: false },
        { id: 3, type: "Comorbidade", description: "Diabetes", isChecked: false },
        { id: 4, type: "Comorbidade", description: "Hipertensão", isChecked: false },
        { id: 5, type: "Condição Especial", description: "Gravidez", isChecked: false },
        { id: 6, type: "Condição Especial", description: "Deficiência visual", isChecked: false },
    ]);
    
    function handleHistory(){
        navigation.navigate('HealthConditions' as never)
    }

    const handleSearchOrAddRecord = () => {
        const existingRecord = records.find(record =>
            record.description.toLowerCase() === searchTerm.toLowerCase() &&
            record.type === selectedOption
        );

        if (existingRecord) {
            setSearchTerm(existingRecord.description);
        } else {
            if (searchTerm.trim() !== "") {
                const newId = records.length ? records[records.length - 1].id + 1 : 1;
                const currentDate = new Date().toLocaleDateString();
                const newRecordObj = { id: newId, type: selectedOption, description: searchTerm, isChecked: false };
                setRecords([...records, newRecordObj]);
                setSearchTerm("");

                console.log('Novo registro em :', currentDate, newRecordObj);
            }
        }
    };

    const printCheckedRecords = () => {
        const currentDate = new Date().toLocaleDateString();
        const checkedRecords = records.filter(record => record.isChecked === true);
        checkedRecords.forEach(record => {
            console.log('Novo registro em:', currentDate, record);
        });
    };

    async function handleConditionUpdate() {
        try {
            const selectedConditions = records.filter(record => record.isChecked);
            const selectedDescriptions = selectedConditions.map(condition => condition.description).join(', ');
            setNewFetch(newFetch + 1);

            Alert.alert(
                "Atualização concluída",
                `Condições cadastradas: ${selectedDescriptions}`,
                [
                    {
                        text: "Ok",
                        onPress: () => {handleHistory},
                    },
                ]
            );
            console.log("Condições submetidas");
        } catch (error) {
            Alert.alert(
                "Erro na atualização de condições",
                `${error.message}`,
                [
                    {
                        text: "Ok",
                        onPress: () => {},
                    },
                ]
            );
            console.log(error.message);
        }
    };

    return (
      <SafeAreaView style={styles.safeArea}>
        <HeaderSimple titleScreen="Condições e Sintomas" />
        <ScrollView>
          <MenuHandlerComponent/>
          <View style={styles.container}>
            <View style={styles.contentContainer}>
              <CustomSelect
                label=""
                selectedValue={selectedOption}
                onValueChange={(itemValue) => {setNewFetch(newFetch + 1), setSelectedOption(itemValue)}}
                items={[
                  { label: "Sintoma", value: "symptom" },
                  { label: "Comorbidade", value: "comorbity" },
                  { label: "Condição Especial", value: "specialCondition" },
                ]}
              />
              <InsertCondition newFetch={newFetch} selectedItem={selectedOption} />
            </View>
          </View>
        </ScrollView>
        <View style={styles.bottom}>
          <BlueButton
            accessibilityLabel="Atualizar condições de saúde"
            title="Atualizar Condições"
            onPress={() => {
              handleSearchOrAddRecord();
              printCheckedRecords();
              handleConditionUpdate();
            }}
          />
        </View>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10
  },
  bottom: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  searchContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  optionsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 10,
  },
});

export default ConditionInsertPage;
