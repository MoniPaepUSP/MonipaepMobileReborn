import { MaterialIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';
import { HeaderSimple, SafeAreaView } from "../components";
import FrequentQuestionsComponent from '../components/FrequentQuestionsComponent';
import Menu from '../components/Menu';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import NewQuestionModal from '../components/NewQuestionModal';

export function FrequentQuestions(): JSX.Element {
  const drawerRef = useRef(null);
  const [menuVisible, setMenuVisible] = useState(false);
  function openMenu(): void {
    setMenuVisible(true);
  }
  function closeMenu(): void {
    setMenuVisible(false);
  }

  const [openNewQuestionDialog, setOpenNewQuestionDialog] = useState(false);
  const handleOpenNewQuestionDialog = (): void => {
    setOpenNewQuestionDialog(true);
  }
  const handleCloseNewQuestionDialog = (): void => {
    setOpenNewQuestionDialog(false);
  }


  return (
    <DrawerLayout
      ref={drawerRef}
      drawerWidth={(2 / 3) * Dimensions.get('window').width}
      drawerPosition="left"
      renderNavigationView={() => <Menu onCloseMenu={() => drawerRef.current.closeDrawer()} />}
    >
    <SafeAreaView  
      accessible={true}
      accessibilityLabel="Página de Perguntas Frequentas"
    >
      <HeaderSimple titleScreen="Perguntas Frequentes" />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View
          style={styles.container}
          accessible={true} 
        >
          <View style={styles.bodyUp} accessible={true}>
              <TouchableOpacity onPress={openMenu}>
                <MaterialIcons
                  style={styles.icons}
                  name="menu"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              <View style={styles.textAPP} accessible={true}>
                <Text style={styles.appName}>MoniPaEp</Text>
              </View>
            </View>
          <FrequentQuestionsComponent />
          <TouchableOpacity style={styles.button} onPress={handleOpenNewQuestionDialog}>
            <Text style={styles.buttonText}>Enviar uma pergunta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        visible={menuVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeMenu}
      >
        <Menu onCloseMenu={closeMenu} />
      </Modal>
      {openNewQuestionDialog && <NewQuestionModal visible={openNewQuestionDialog} onClose={handleCloseNewQuestionDialog} />}
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
  button: {
    backgroundColor: colors.green,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});