import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import colors from "../styles/colors";
import { Login, SignUp } from '../pages';

const stackNavigator = createStackNavigator();

const Stack: React.FC = () => (
  <stackNavigator.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white,
      },
      headerShown: false
    }}
  >
    <stackNavigator.Screen name="Login" component={Login} />
    <stackNavigator.Screen name="SignUp" component={SignUp} />
    {/* PAGES */}
  </stackNavigator.Navigator>
);

export default Stack;
