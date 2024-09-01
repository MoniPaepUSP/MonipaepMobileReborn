import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect, useRef } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { GreenButton, HeaderSimple, FAQ, SafeAreaView } from '../components';
import { ChatButton } from '../components/ChatButton';
import { useAuth } from '../contexts/auth.context';
import Menu from "../components/Menu";
import Modal from 'react-native-modal';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Home() {
    const navigation = useNavigation();
    const { user, refreshToken, token, signed, signOut } = useAuth();
    const [menuVisible, setMenuVisible] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [redirected, setRedirected] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);

    const images = [
        { uri: 'https://www.gov.br/conitec/pt-br/assuntos/noticias/2024/fevereiro/pacientes-com-vasculite-ganham-protocolo-sobre-tratamento-da-doenca-no-sus/vasculite-sus_card-conitec-1.png' },
        { uri: 'https://www.conass.org.br/wp-content/uploads/2022/01/IMG000000000278418-1024x1024.jpeg' },
        { uri: 'https://www.unasus.gov.br/uploads/Lanc%CC%A7amento%20Odonto%20infecciosas_%20FEED%201_%20%281%29.jpg' }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Trocar imagem a cada 3 segundos

        return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
    }, []);

    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ index: currentIndex, animated: true });
        }
    }, [currentIndex]); // Executa quando currentIndex muda

    const date = user?.lastUpdate;
    let dateString = '';
    let days = 0;

    if (typeof date === 'string') {
        dateString = date;
        const difference = Math.abs(Date.now() - Date.parse(dateString));
        days = Math.round(difference / (1000 * 3600 * 24));
    } else if (date instanceof Date) {
        dateString = date.toISOString();
        const difference = Math.abs(Date.now() - date.getTime());
        days = Math.round(difference / (1000 * 3600 * 24));
    }

    async function Data() {
        //const patientId = await getUser()
        //const token = await getAccessToken()
        //const refreshToken = await getRefreshToken()
        /*
        console.log("Exibindo UseContext")
        console.log(user)
        console.log(token)
        console.log(refreshToken)
        console.log("Signed: "+signed)
        */

        //navigation.navigate('Symptoms')
    }

    function handleConfig() {
        //navigation.navigate('Config')
    }

    function handleConditions() {
        navigation.navigate('HealthConditions' as never);
    }

    function handleFrequentQuestions() {
        navigation.navigate('FrequentQuestions' as never);
    }

    function openMenu() {
        setMenuVisible(true);
    }

    function closeMenu() {
        setMenuVisible(false);
    }

    const handleButtonClick = () => {
        if (!redirected) {
            setShowPopup(true);
        } else {
            //handleEncaminhamento
        }
        // Marque como redirecionado para a próxima vez
        setRedirected(true);
    };

    const closeModal = () => {
        setShowPopup(false);
        // Navegue para onde desejar após fechar o pop-up, exemplo fictício:
        // navigation.navigate('MinhaPágina');
    };

    return (
        <SafeAreaView
            accessible={true}
            accessibilityLabel="Página de perfil"
            style={styles.container}
        >
            <HeaderSimple titleScreen={`Bem vindo(a) ${user?.name.split(' ')[0]}`} />
            <View
                style={styles.top}
                accessible={true}
            >
                <TouchableOpacity onPress={openMenu} style={styles.styleMenu}>
                    <MaterialIcons style={styles.icons} name="menu" size={24} color="black" />
                </TouchableOpacity>
                <ChatButton
                    accessibilityLabel="Botão. Clique para visualizar as notificações"
                    title="Notificações"
                    onPress={Data}
                />
            </View>
            <View style={styles.carouselContainer}>
                <FlatList
                    ref={flatListRef}
                    data={images}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item.uri }} style={styles.image} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                />
                <Modal
                    isVisible={showPopup}
                    animationIn="slideInUp"
                    onBackdropPress={closeModal}
                    backdropOpacity={0.3}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>
                                Atualize os seus registros antes de obter um encaminhamento!
                            </Text>
                            <TouchableOpacity  style={styles.button}
                                accessibilityLabel="Botão para fechar o pop up"
                                onPress={closeModal}
                            >
                                <Text style={styles.buttonText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
            <View
                accessible={true}
                style={styles.bottom}
            >
                <GreenButton
                    accessibilityLabel="Botão. Clique para ir para a página de atualizar condições"
                    title="Atualizar condições"
                    onPress={handleConditions}
                />

                <GreenButton
                    accessibilityLabel="Botão. Clique para ir para a página de encaminhamento"
                    title="Obter encaminhamento"
                    onPress={handleButtonClick}
                />

                <FAQ
                    accessible={true}
                    accessibilityLabel="Botão. Clique para ir para a página de perguntas frequentes"
                    title="Perguntas Frequentes"
                    onPress={handleFrequentQuestions}
                />
            </View>
            <View>
                {/* Modal for the Menu */}
                <Modal
                    isVisible={menuVisible}
                    animationIn="slideInLeft"
                    animationOut="slideOutLeft"
                    onBackdropPress={closeMenu}
                    backdropOpacity={0.3}
                    style={styles.modalLeft}
                >
                    <Menu onCloseMenu={closeMenu} />
                </Modal>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        marginTop: 10
    },
    styleMenu: {
        alignSelf: 'center'
    },
    icons: {
        padding: 10,
    },
    carouselContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.5,
        resizeMode: 'contain',
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 10,
        width: Dimensions.get('window').width * 0.88,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 15,
        fontFamily: fonts.generic,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 25,
    },
    modalLeft: {
        justifyContent: 'flex-start',
        margin: 0,
    },
    button: {
        backgroundColor: colors.green,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width * 0.8,
        marginTop: 30,
    },
    buttonText: {
        fontSize: 16,
        color: colors.white,
        fontFamily: fonts.warning,
        fontWeight: 'bold',
    },
    bottom: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 15
    },
});
