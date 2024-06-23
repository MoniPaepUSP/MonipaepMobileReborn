import React, { useState, useRef } from 'react';
import { Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerLayout } from 'react-native-gesture-handler';
import { BlueButton, HeaderSimple, SafeAreaView } from '../components';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import ConditionCard from '../components/ConditionCard';
import { useNavigation } from "@react-navigation/native";
import { Menu } from '../components/Menu';

interface ConditionsProps {
  condition: string;
}

export function HealthConditions() {
  const navigation = useNavigation();
  const [conditions, setConditions] = useState<ConditionsProps[]>([
    { condition: 'Diabetes Tipo 2' },
    { condition: 'Alergia a Amendoim' },
    { condition: 'Hipertensão' }
  ]);
  const drawerRef = useRef(null);

  function handleCondition() {
    navigation.navigate('ConditionInsert' as never);
  }

  return (
    <DrawerLayout
      ref={drawerRef}
      drawerWidth={(2 / 3) * Dimensions.get('window').width}
      drawerPosition="left"
      renderNavigationView={() => <Menu onCloseMenu={() => drawerRef.current.closeDrawer()} />}
    >
      <SafeAreaView accessible={true} style={styles.safeArea}>
        <HeaderSimple titleScreen="Condições e Sintomas" />
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <TouchableOpacity onPress={() => drawerRef.current.openDrawer()} style={styles.menuButton}>
            <MaterialIcons name="menu" size={24} color="black" />
          </TouchableOpacity>

          <View style={styles.container}>
            <View style={styles.bodyUp} accessible={true}>
              <MaterialIcons style={styles.icons} name="menu" size={24} color="black" />
              <View style={styles.textAPP} accessible={true}>
                <Text style={styles.appName}>MoniPaEp</Text>
              </View>
            </View>
            <View style={styles.conditionsContainer}>
              {conditions.map((item, index) => (
                <View key={index} style={styles.condition}>
                  <View style={[styles.hr, index === conditions.length - 1 && { marginBottom: 15 }]} />
                  <ConditionCard condition={item.condition} />
                  {index !== conditions.length && <View style={styles.hr} />}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        <View style={styles.bottom}>
          <BlueButton
            accessibilityLabel="Botão. Clique para atualizar condições de saúde"
            title="Atualizar Condições"
            onPress={handleCondition}
          />
        </View>
      </SafeAreaView>
    </DrawerLayout>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  condition: {
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
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  menuButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 100,
  },
  conditionsContainer: {
    marginTop: Dimensions.get('window').height*0.18,
  },
});
