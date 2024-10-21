import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import api from '../services/axios';

const SignupScreen = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [telefone, setTelefone] = useState("");

  const handleSignup = async () => {
    if (!nome || !email || !senha || !localizacao || !telefone) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await api.post('/api/Usuario/Cadastrar', {
        nome,
        email,
        senha,
        localizacao,
        telefone,
      });

      if (response.status === 200) {
        Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      }
    } catch (error) {
      console.error('Erro ao fazer cadastro:', error);
      Alert.alert("Erro", "Erro ao realizar o cadastro. Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Localização"
        value={localizacao}
        onChangeText={setLocalizacao}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />
      <Button title="Cadastrar" onPress={handleSignup} />
      <Text style={styles.loginText}>
        Já tem uma conta? <Text style={styles.loginLink}>Faça login</Text>
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
  loginText: {
    marginTop: 20,
    textAlign: "center",
    color: "#777",
  },
  loginLink: {
    color: "#1e90ff",
    fontWeight: "bold",
  },
});

export default SignupScreen;