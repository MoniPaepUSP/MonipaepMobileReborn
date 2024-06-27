import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import colors from "../styles/colors";
import { Login } from "../pages/Login"; // Verifique se os caminhos e nomes estão corretos
import { SignUp } from "../pages/SignUp";
import { Profile } from "../pages/Profile";
import { HealthConditions } from "../pages/HealthConditions";
import { Symptoms } from "../pages";

const Stack = createDrawerNavigator();

const StackRoutes = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: true,
    }}
  >
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="HealthConditions" component={HealthConditions} />
    <Stack.Screen name="Symptoms" component={Symptoms} />
    {/* PAGES */}
  </Stack.Navigator>
);

export default StackRoutes;
