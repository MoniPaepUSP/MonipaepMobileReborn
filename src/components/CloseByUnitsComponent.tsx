import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Accordion } from './Accordion';
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from '../styles/colors';

type HospitalData = {
  name: string;
  cep: string
  address: string;
  addressNumber: string;
  neighbourhood: string;
  city: string;
  state: string;
}

enum UnitType {
  UBS = "UBS",
  HOSPITAL = "HOSPITAL",
  POSTO_SAUDE="POSTO SAUDE"
}

type HospitalUnit ={
  type: UnitType;
  data: HospitalData;
  distance: number;
}

const hospitalUnimed: HospitalUnit = {
  type: UnitType.HOSPITAL,
  distance: 200,
  data: {
    name: "Hospital Unimed",
    cep: "13561-003",
    address: "Av. Dr. Carlos Botelho",
    addressNumber: "1055",
    neighbourhood: "Centro",
    city: "São Carlos",
    state: "SP"
  },
}

const ubsCentral: HospitalUnit = {
  type: UnitType.UBS,
  distance: 150,
  data: {
    name: "UBS Central",
    cep: "13560-110",
    address: "R. Conde do Pinhal",
    addressNumber: "2000",
    neighbourhood: "Centro",
    city: "São Carlos",
    state: "SP"
  },
}

const hospitalSaoCarlos: HospitalUnit = {
  type: UnitType.HOSPITAL,
  distance: 500,
  data: {
    name: "Hospital São Carlos",
    cep: "13560-230",
    address: "R. Vinte e Oito de Setembro",
    addressNumber: "700",
    neighbourhood: "Centro",
    city: "São Carlos",
    state: "SP"
  },
}

const ubsVilaIsabel: HospitalUnit = {
  type: UnitType.UBS,
  distance: 300,
  data: {
    name: "UBS Vila Isabel",
    cep: "13566-410",
    address: "R. Américo Brasiliense",
    addressNumber: "1700",
    neighbourhood: "Vila Isabel",
    city: "São Carlos",
    state: "SP"
  },
}

const hospitalNossaSenhora: HospitalUnit = {
  type: UnitType.HOSPITAL,
  distance: 750,
  data: {
    name: "Hospital Nossa Senhora Aparecida",
    cep: "13567-320",
    address: "R. Quinze de Novembro",
    addressNumber: "300",
    neighbourhood: "Centro",
    city: "São Carlos",
    state: "SP"
  },
}

const ubsSantaFelicia: HospitalUnit = {
  type: UnitType.UBS,
  distance: 1000,
  data: {
    name: "UBS Santa Felícia",
    cep: "13566-140",
    address: "R. José Benetti",
    addressNumber: "800",
    neighbourhood: "Santa Felícia",
    city: "São Carlos",
    state: "SP"
  },
}

const closeByUnits = [
  hospitalUnimed,
  ubsCentral,
  hospitalSaoCarlos,
  ubsVilaIsabel,
  hospitalNossaSenhora,
  ubsSantaFelicia
];

export default function CloseByUnitsComponent(): JSX.Element {
  const [isFullList, setIsFullList] = useState(false);
  const [isFullMap, setIsFullMap] = useState(false);

  const toggleList = (): void => {
    setIsFullList(!isFullList);
    setIsFullMap(false);
  };

  const toggleMap = (): void => {
    setIsFullMap(!isFullMap);
    setIsFullList(false);
  };

  function formatHospitalAddress(hospital: HospitalData): string {
    return `${hospital.address}, ${hospital.addressNumber} - ${hospital.neighbourhood}, ${hospital.city} - ${hospital.state}, ${hospital.cep}`;
  }

  const floatingButtonStyle = isFullMap ? styles.openListFloatingButton : styles.closeListFloatingButton

  return (
    <View style={styles.container}>
      <View style={[styles.mapContainer, isFullList && styles.hidden, isFullMap && styles.fullScreen]}>
        <Image source={require('../assets/CloseByUnits.png')} style={styles.map} />
        <TouchableOpacity style={floatingButtonStyle} onPress={toggleMap}>
          <AntDesign name={isFullMap ? "up" : "down"} size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={[styles.listContainer, isFullMap && styles.hidden, isFullList && styles.fullScreen]}>
        <ScrollView contentContainerStyle={styles.list}>
          {
            closeByUnits.map((unit, index): JSX.Element => {
              const { data, type, distance } = unit;
              const { name } = data;
              const icon = type === UnitType.HOSPITAL ?  <MaterialIcons name="local-hospital" size={24} color={colors.red} /> : <MaterialIcons name="local-hospital" size={24} color={colors.blue} />
              const hospitalAddress = formatHospitalAddress(data);

              return (
                <Accordion key={index} title={name} icon={icon} backgroundColor={colors.white}>
                  <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 12, backgroundColor: '#fff', paddingLeft: 8, paddingRight: 8 }}>A {distance} metros de você</Text>
                    <Text style={styles.listItem}>{hospitalAddress}</Text>
                  </View>
                </Accordion>
              )
            })
          }
        </ScrollView>
        <View style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: 20}}>
          <TouchableOpacity style={styles.button} onPress={toggleList}>
            <Text style={styles.buttonText}>{isFullList ? "Voltar ao mapa" : "Ver lista completa"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: '100%',
  },
  mapContainer: {
    flex: 0.50,
  },
  map: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  listContainer: {
    flex: 0.50,
    position: 'relative',
    backgroundColor: colors.blue,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  list: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: Dimensions.get('window').width * 0.95,
    maxWidth: 600,
    gap: 12
  },
  listItem: {
    fontSize: 14,
    paddingBottom: 10,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#fff',
    width: '100%',
  },
  hidden: {
    display: 'none',
  },
  fullScreen: {
    flex: 1,
  },
  openListFloatingButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 30,
  },
  closeListFloatingButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 30,
  },
  button: {
    backgroundColor: colors.green,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
