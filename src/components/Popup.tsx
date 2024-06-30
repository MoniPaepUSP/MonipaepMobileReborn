import React from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Shadow } from 'react-native-shadow-2';

const Popup = ({ onNavigate }) => {
  const navigation = useNavigation();

  return (
    <Shadow
      distance={5} 
      startColor={'#00000010'}    
       >
      <View style={styles.popup}>
        <Text style={styles.atualizacaoConcluida}>Atualização Concluída</Text>
        <Text style={styles.seusSintomasForam}>
          Seus sintomas foram atualizados com sucesso. Por favor continue nos informando se o seus sintomas mudarem.
        </Text>
        <Pressable
          style={styles.buttonPrimary}
          onPress={onNavigate ? onNavigate : () => navigation.navigate("ConditionsInsert" as never)}
        >
          <Text style={styles.voltarANavegacao}>
            Voltar a navegação
          </Text>
        </Pressable>
      </View>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  popup: {
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  atualizacaoConcluida: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: fonts.generic,
  },
  seusSintomasForam: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 50,
    fontFamily: fonts.generic,
  },
  buttonPrimary: {
    width: '100%',
    backgroundColor: colors.green,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  voltarANavegacao: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: fonts.generic,
  },
});

export default Popup;
