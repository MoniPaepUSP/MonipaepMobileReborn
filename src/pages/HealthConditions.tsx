import React, { useState, useRef } from 'react';
import { Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity, } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BlueButton, HeaderSimple, SafeAreaView } from '../components';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import ConditionCard from '../components/ConditionCard';
import SymptomCard from '../components/SymptomCard';
import { useNavigation } from "@react-navigation/native";
import Menu from '../components/Menu';
import Modal from 'react-native-modal';
import { IConditionsProps, ISymptomCardProps } from '../interfaces/conditions.interface';
import InternalPageDefault from '../components/MenuHandlerComponent';
import MenuHandlerComponent from '../components/MenuHandlerComponent';


export function HealthConditions() {
  const navigation = useNavigation();
  const [conditions, setConditions] = useState<IConditionsProps[]>([
    { condition: "Diabetes Tipo 2" },
    { condition: "Alergia a Amendoim" },
  ]);
  const [symptoms, setSymptoms] = useState<ISymptomCardProps[]>([
    { symptom: "Febre alta e constante" },
    { symptom: "Dor nas articulações" },
    { symptom: "Dor nas articulações" },
  ]);
  
  function handleCondition() {
    navigation.navigate('ConditionInsertPage' as never);
  }

  return (
      <SafeAreaView accessible={true} style={styles.safeArea}>
        <HeaderSimple titleScreen="Condições e Sintomas" />
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.container}>
            <MenuHandlerComponent/>
            <View style={styles.conditionsContainer}>
              {conditions.map((item, index) => (
                <View key={index} style={styles.condition}>
                  <View style={[styles.hr, index === conditions.length - 1 && { marginBottom: 15 }]} />
                  <ConditionCard condition={item.condition} />
                  {index !== conditions.length && <View style={styles.hr} />}
                </View>
              ))}
            </View>
            <View style={styles.symptomsContainer}>
              {symptoms.map((item, index) => (
                <View key={index} style={styles.symptom}>
                  <View style={[styles.hr, index === symptoms.length - 1 && { marginBottom: 15 }]} />
                  <SymptomCard symptom={item.symptom} />
                  {index !== symptoms.length && <View style={styles.hr} />}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        <View style={styles.bottom}>
          <BlueButton 
            accessibilityLabel="Botão. Clique para atualizar condições de saúde"
            title="Atualizar Registros"
            onPress={handleCondition}
          />
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  condition: {
    marginVertical: -10,
  },
  symptom: {
    marginVertical: -10,
  },
  scrollViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
  },
  bodyUp: {
    width: '100%',
    height: Dimensions.get('window').height * 0.15,
    justifyContent: 'center',
    paddingBottom: 15,
  },
  icons: {
    padding: 20,
  },
  appName: {
    fontFamily: fonts.appName,
    fontWeight: 'bold',
    fontSize: 32,
    color: colors.blue,
  },
  textAPP: {
    alignItems: 'center',
  },
  hr: {
    borderBottomColor: colors.gray_light2,
    borderBottomWidth: 1.5,
    marginTop: 15,
    marginBottom: 15
  },
  bottom: {
    width: '100%',
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  menuButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 100,
  },
  conditionsContainer: {
    marginTop: Dimensions.get('window').height*0.09,
  },
  symptomsContainer: {
    marginTop: 0,
  },
  modalLeft: {
    justifyContent: 'flex-start',
    margin: 0,
},
});
