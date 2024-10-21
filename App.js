import React from 'react';
import { AuthProvider } from './src/context/AuthContext'; // Certifique-se de usar o caminho correto
import LoginScreen from './src/views/LoginScreen';

export default function App() {
  return (
    <AuthProvider>
      <LoginScreen />
    </AuthProvider>
  );
}
