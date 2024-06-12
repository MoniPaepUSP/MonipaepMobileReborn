import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Stack from './src/routes/stack.routes';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./src/contexts/auth.context";

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack />
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthProvider>
  );
}

