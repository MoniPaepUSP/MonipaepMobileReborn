import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import colors from "../styles/colors";
import { Login, SignUp, Symtopms } from "../pages";

const stackNavigator = createStackNavigator();

const Stack: React.FC = () => (
  <stackNavigator.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white,
      },
      headerShown: false,
    }}
  >
    <stackNavigator.Screen name="Login" component={Login} />
    <stackNavigator.Screen name="SignUp" component={SignUp} />
    <stackNavigator.Screen name="Symptoms" component={Symtopms} />
    {/* PAGES */}
  </stackNavigator.Navigator>
);

export default Stack;
