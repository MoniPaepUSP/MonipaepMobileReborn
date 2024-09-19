import { MaterialIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';
import { HeaderSimple, SafeAreaView } from "../components";
import CloseByUnitsComponent from '../components/CloseByUnitsComponent';
import Menu from '../components/Menu';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import Modal from 'react-native-modal';
import MenuHandlerComponent from '../components/MenuHandlerComponent';

export function CloseByUnits(): JSX.Element {
  const drawerRef = useRef(null);
  
  return (
    <DrawerLayout
      ref={drawerRef}
      drawerWidth={(2 / 3) * Dimensions.get('window').width}
      drawerPosition="left"
      renderNavigationView={() => <Menu onCloseMenu={() => drawerRef.current.closeDrawer()} />}
    >
      <SafeAreaView  
        style={styles.safeArea}
        accessible={true}
        accessibilityLabel="Página de Unidades Próximas">
        <HeaderSimple titleScreen="Unidades Próximas" />
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View
            style={styles.container}
            accessible={true}
          >
            <MenuHandlerComponent/>
            <View style={styles.bodyDown}>
              <CloseByUnitsComponent />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </DrawerLayout>
  )
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
    flexGrow: 1,
    width: '100%',
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  bodyUp: {
    width: '100%',
    height: Dimensions.get('window').height * 0.15,
    justifyContent: 'center',
    paddingBottom: 15,
  },
  bodyDown: {
    width: '100%',
    flex: 1,
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