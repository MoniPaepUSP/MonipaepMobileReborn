import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, SignUp } from "../pages";
import colors from "../styles/colors";
import { ChangePasswordPage } from "../pages/ChangePasswordPage";

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <AuthStack.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white,
      },
      headerShown: false,
    }}
  >
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="SignUp" component={SignUp} />
    <AuthStack.Screen
      name="ChangePasswordPage"
      component={ChangePasswordPage}
    />
  </AuthStack.Navigator>
);

export default AuthRoutes;
