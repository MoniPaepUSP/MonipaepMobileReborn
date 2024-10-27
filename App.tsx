import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./src/contexts/auth.context";
import Routes from './src/routes';
import * as SplashScreen from 'expo-splash-screen';
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";
import { useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync();

export default function App() {

  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      setIsReady(true);
      SplashScreen.hideAsync(); // Hide the splash screen after fonts are loaded
    }
  }, [fontsLoaded]); // Add fontsLoaded as a dependency to trigger the effect when fonts are loaded

  if (!fontsLoaded || !isReady) {
    return null; // Keep showing the splash screen until fonts are loaded and the app is ready
  }

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <NavigationContainer independent={true}>
          <Routes />
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthProvider>
  );
}

