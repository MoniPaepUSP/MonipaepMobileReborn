import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Symtopms } from "../pages/Symptoms";
import colors from "../styles/colors";

const AppStack = createStackNavigator();

const AppRoutes: React.FC = () => (
  <AppStack.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white,
      },
      headerShown: false,
    }}
  >
    <AppStack.Screen name="Profile" component={Symtopms} />
  </AppStack.Navigator>
);

export default AppRoutes;
