import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HealthConditions } from "../pages/HealthConditions"; // Verifique se o caminho está correto
import colors from "../styles/colors";
import { Login, SignUp, Symptoms } from "../pages";
import { Profile } from "../pages/Profile";

const AppStack = createStackNavigator();

const AppRoutes = () => (
  <AppStack.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white,
      },
      headerShown: false,
    }}
  >
    <AppStack.Screen name="HealthConditions" component={HealthConditions} />
    <AppStack.Screen name="Login" component={Login} />
    <AppStack.Screen name="SignUp" component={SignUp} />
    <AppStack.Screen name="Profile" component={Profile} />
    <AppStack.Screen name="Symptoms" component={Symptoms} />
  </AppStack.Navigator>
);

export default AppRoutes;
