import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Stack from './stack.routes';


const AppRoutes: React.FC = () => (
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
)

export default AppRoutes;