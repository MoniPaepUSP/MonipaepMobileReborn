import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HealthConditions } from "../pages/HealthConditions";
import colors from "../styles/colors";
import { Login, SignUp, Symptoms } from "../pages";
import { Home } from "../pages/Home";
import { ConditionInsertPage } from "../pages/ConditionInsertPage";
import { Profile } from "../pages/Profile";
import { FrequentQuestions } from "../pages/FrequentQuestions";
import { CloseByUnits } from "../pages/CloseByUnits";
import { MyAppointments } from "../pages/MyAppointments";
import { AppointmentRegister } from "../pages/AppointmentRegister";
import { NotificationPage } from "../pages/NoticationPage";
import { EditProfileInfoPage } from "../pages/EditProfileInfoPage";

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
    {/* <AppStack.Screen name="Symptoms" component={Symptoms} /> */}
    <AppStack.Screen name="FrequentQuestions" component={FrequentQuestions} />
    <AppStack.Screen name="CloseByUnits" component={CloseByUnits} />
    <AppStack.Screen
      name="ConditionInsertPage"
      component={ConditionInsertPage}
    />
    <AppStack.Screen name="Profile" component={Profile} />
    <AppStack.Screen name="MyAppointments" component={MyAppointments} />
    <AppStack.Screen name="Notification" component={NotificationPage} />
    <AppStack.Screen name="EditInfoPage" component={EditProfileInfoPage} />
    {/* <AppStack.Screen name="AppointmentRegister" component={AppointmentRegister} /> */}
  </AppStack.Navigator>
);

export default AppRoutes;
