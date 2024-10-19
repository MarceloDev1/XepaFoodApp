import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

const LoginScreen = () => {
  // Estados para armazenar o e-mail e senha digitados
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Função de login
  const handleLogin = () => {
    // Aqui você pode adicionar a lógica para chamar a API de autenticação
    if (email === "" || senha === "") {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    // Exemplo de validação básica
    if (email === "admin@xepafood.com" && senha === "123456") {
      Alert.alert("Sucesso", "Login realizado com sucesso!");
    } else {
      Alert.alert("Erro", "E-mail ou senha incorretos.");
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

      {/* Área para link de "Esqueceu a senha?" ou "Cadastre-se" */}
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