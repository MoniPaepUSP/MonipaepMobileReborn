import { MaterialIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';
import { HeaderSimple, SafeAreaView } from "../components";
import FrequentQuestionsComponent from '../components/FrequentQuestionsComponent';
import Menu from '../components/Menu';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import NewQuestionModal from '../components/NewQuestionModal';
import Modal from 'react-native-modal';
import MenuHandlerComponent from '../components/MenuHandlerComponent';

export function FrequentQuestions(): JSX.Element {

  const [openNewQuestionDialog, setOpenNewQuestionDialog] = useState(false);
  const handleOpenNewQuestionDialog = (): void => {
    setOpenNewQuestionDialog(true);
  }
  const handleCloseNewQuestionDialog = (): void => {
    setOpenNewQuestionDialog(false);
  }


  return (
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
          <MenuHandlerComponent/>
          <FrequentQuestionsComponent />
          <TouchableOpacity style={styles.button} onPress={handleOpenNewQuestionDialog}>
            <Text style={styles.buttonText}>Enviar uma pergunta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {openNewQuestionDialog && <NewQuestionModal visible={openNewQuestionDialog} onClose={handleCloseNewQuestionDialog} />}
    </SafeAreaView>
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
  modalLeft: {
    justifyContent: 'flex-start',
    margin: 0,
},
});