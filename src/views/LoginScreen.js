import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import api from '../services/axios';
import { useAuth } from '../context/AuthContext'; 

const LoginScreen = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    if (email === "" || senha === "") {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await api.post('/api/Usuario/Login', {
        email: email,
        senha: senha,
      });

      if (response.status === 200) {
        login(response.data.user);
        Alert.alert("Sucesso", "Login realizado com sucesso!");
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert("Erro", "E-mail ou senha incorretos ou erro na conexão.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleLogin} />
      <Text style={styles.signupText}>
        Não tem uma conta? <Text style={styles.signupLink}>Cadastre-se</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  signupText: {
    marginTop: 20,
    textAlign: "center",
    color: "#777",
  },
  signupLink: {
    color: "#1e90ff",
    fontWeight: "bold",
  },
});

export default LoginScreen;