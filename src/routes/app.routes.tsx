import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HealthConditions } from "../pages/HealthConditions";
import colors from "../styles/colors";
import { Login, SignUp, Symptoms } from "../pages";
import { Home } from "../pages/Home";
import { ConditionInsert } from "../pages/ConditionInsert";
import { Profile } from "../pages/Profile";
import { FrequentQuestions } from "../pages/FrequentQuestions";
import { CloseByUnits } from "../pages/CloseByUnits";
import { MyAppointments } from "../pages/MyAppointments";

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
    <AppStack.Screen name="Home" component={Home} />
    <AppStack.Screen name="HealthConditions" component={HealthConditions} />
    <AppStack.Screen name="Login" component={Login} />
    <AppStack.Screen name="SignUp" component={SignUp} />
    <AppStack.Screen name="Symptoms" component={Symptoms} />
    <AppStack.Screen name="FrequentQuestions" component={FrequentQuestions} />
    <AppStack.Screen name="CloseByUnits" component={CloseByUnits} />
    <AppStack.Screen name="ConditionInsert" component={ConditionInsert} />
    <AppStack.Screen name="Profile" component={Profile} />
    <AppStack.Screen name="MyAppointments" component={MyAppointments} />
  </AppStack.Navigator>
);

export default AppRoutes;
