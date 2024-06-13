import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Stack from './src/routes/stack.routes';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./src/contexts/auth.context";
import Routes from './src/routes';

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthProvider>
  );
}

