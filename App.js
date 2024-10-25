import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/context/AuthContext';
import LoginScreen from './src/views/LoginScreen';
import HomeScreen from './src/views/HomeScreen';
import SignupScreen from './src/views/SignupScreen';
import CadastrarProdutoScreen from './src/views/CadastrarProdutoScreen';
import CadastrarLojaScreen from './src/views/CadastrarLojaScreen';
import EstoqueScreen from './src/views/EstoqueScreen';
import FeiranteScreen from './src/views/FeiranteScreen';
import EditarLojaScreen from './src/views/EditarLojaScreen';
import CadastroLojaScreen from './src/views/CadastroLojaScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="CadastrarProduto" component={CadastrarProdutoScreen} />
          <Stack.Screen name="CadastrarLoja" component={CadastrarLojaScreen} />
          <Stack.Screen name="Estoque" component={EstoqueScreen} />
          <Stack.Screen name="FeiranteScreen" component={FeiranteScreen} />
          <Stack.Screen name="EditarLojaScreen" component={EditarLojaScreen} />
          <Stack.Screen name="CadastroLoja" component={CadastroLojaScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}