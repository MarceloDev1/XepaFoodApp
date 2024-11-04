import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import api from '../services/axios';

const SignupScreen = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cep, setCEP] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [uf, setUF] = useState("");
  const [cidade, setCidade] = useState("");
  const [telefone, setTelefone] = useState("");

  const handleCEPChange = async (cep) => {
    setCEP(cep);
    
    if (cep.length === 8) { // Verifica se o CEP tem 8 dígitos
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
          Alert.alert("Erro", "CEP não encontrado.");
          return;
        }

        setLogradouro(data.logradouro || "");
        setBairro(data.bairro || "");
        setCidade(data.localidade || "");
        setUF(data.uf || "");
      } catch (error) {
        console.error("Erro ao buscar endereço:", error);
        Alert.alert("Erro", "Não foi possível buscar o endereço. Tente novamente.");
      }
    }
  };

  const handleSignup = async () => {
    if (!nome || !email || !senha || !cep || !telefone) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await api.post('/api/Usuario/CriarUsuario', {
        nome,
        email,
        senha,
        cep, 
        logradouro, 
        bairro, 
        cidade,
        uf,
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
        placeholder="CEP"
        value={cep}
        onChangeText={handleCEPChange}
        keyboardType="numeric"
        maxLength={8}
      />
      <TextInput
        style={styles.input}
        placeholder="Logradouro"
        value={logradouro}
        onChangeText={setLogradouro}
      />
      <TextInput
        style={styles.input}
        placeholder="Bairro"
        value={bairro}
        onChangeText={setBairro}
      />
      <TextInput
        style={styles.input}
        placeholder="UF"
        value={uf}
        onChangeText={setUF}
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={cidade}
        onChangeText={setCidade}
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
