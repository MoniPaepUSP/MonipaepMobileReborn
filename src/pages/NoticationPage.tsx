import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { GreenButton, HeaderSimple, SafeAreaView } from "../components";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import MenuHandlerComponent from "../components/MenuHandlerComponent";
import { NotificationBox } from "../components/NotificationBox";

export function NotificationPage() {
  const notifications = [
    {
      title: "Teste 1",
      description: "ASDASDASDASD",
      date: "21/01/2006 14:31",
      wasRead: false,
    },
    {
      title: "Teste 2",
      description: "ASDASDASDASD",
      date: "21/01/2006 14:32",
      wasRead: true,
    },
    {
      title: "Teste 3",
      description: "ASDASDASDASD",
      date: "21/01/2006 14:33",
      wasRead: false,
    },
    {
      title: "Teste 4",
      description: "ASDASDASDASD",
      date: "21/01/2006 14:34",
      wasRead: true,
    },
    {
      title: "Teste 4",
      description: "ASDASDASDASD",
      date: "21/01/2006 14:34",
      wasRead: true,
    },
  ];
  const [isAtBottom, setIsAtBottom] = useState(false);

  const sortedNotifications = notifications.sort((a, b) => {
    if (a.wasRead && !b.wasRead) return 1;
    if (!a.wasRead && b.wasRead) return -1;
    return 0;
  });


  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    if (contentOffset.y + layoutMeasurement.height >= contentSize.height - 200) {
        setIsAtBottom(true);
    }
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
      accessible={true}
      accessibilityLabel="Página de notificações"
    >
      <HeaderSimple titleScreen="Notificações" />
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.container} accessible={true}>
          <MenuHandlerComponent />
          <View style={styles.bodyDown}>
            {sortedNotifications.map((notification, index) => (
              <NotificationBox
                key={index}
                title={notification.title}
                description={notification.description}
                date={notification.date}
                wasRead={notification.wasRead}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <View
        style={[
          styles.bottom,
          {
            position: isAtBottom ? "relative" : "absolute",
            bottom: isAtBottom ? 20 : 40,
            backgroundColor: "transparent",
          },
        ]}
      >
        <GreenButton
          accessibilityLabel="Botão para marcar todas as notificações como lidas. Pressione para cadastrar uma marcar todas as notificações como lidas"
          title="Marcar todas como lida"
        />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    width: "100%",
  },
  container: {
    flex: 1,
  },
  bodyDown: {
    width: "100%",
    padding: 20,
    gap: 10,
    marginBottom: 10,
  },
  bottom: {
    width: "100%",
    padding: 20,
    alignItems: "center",
  },
});