import React from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'; 
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps{
    titleScreen: string
}
export function HeaderSimple({titleScreen}: HeaderProps){
    const navigation = useNavigation()
    
    function handleGoBack(){
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    }
    return(
        <View>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={handleGoBack}
                >
                    <MaterialIcons style={styles.incons} name="chevron-left" size={30} color="white" />
                </TouchableOpacity>
                <View style={styles.textScreenName}>
                    <Text style={styles.textScreenName}>
                        {titleScreen}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        width: '100%',
        backgroundColor: colors.blue,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10   
    },
    incons: {
        paddingLeft: 5
    },
    textScreenName: {
        fontFamily: fonts.generic,
        fontSize: 20,
        paddingLeft: 15,
        color: colors.white,
        justifyContent: 'space-around'
    }
  });