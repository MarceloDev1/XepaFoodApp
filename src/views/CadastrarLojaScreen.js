import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import api from '../services/axios';

const CadastrarLojaScreen = ({ navigation }) => {
  const [nomeLoja, setNomeLoja] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [localizacaoLoja, setLocalizacaoLoja] = useState("");
  const [localizacaoUsuario, setLocalizacaoUsuario] = useState("");
  const [telefone, setTelefone] = useState("");

  const handleCadastrarLoja = async () => {
    if (nomeLoja === "" || localizacaoLoja === "" || telefone === "") {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await api.post('/api/Loja/CriarLojaEUsuario', {
        nomeLoja,
        nome,
        email,
        senha,
        localizacaoLoja,
        localizacaoUsuario,
        telefone,
        feirante : true
      });

      if (response.status === 201) {
        Alert.alert("Sucesso", "Loja cadastrada com sucesso!");
        navigation.navigate('Home'); // Redireciona para a tela Home após cadastro
      }
    } catch (error) {
      console.error('Erro ao cadastrar loja:', error);
      Alert.alert("Erro", "Não foi possível cadastrar a loja.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Loja</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da Loja"
        value={nomeLoja}
        onChangeText={setNomeLoja}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome do Usuário"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
      />
      <TextInput
        style={styles.input}
        placeholder="Localização Loja"
        value={localizacaoLoja}
        onChangeText={setLocalizacaoLoja}
      />
       <TextInput
        style={styles.input}
        placeholder="Localização Usuário"
        value={localizacaoUsuario}
        onChangeText={setLocalizacaoUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
      />
      <Button title="Cadastrar Loja" onPress={handleCadastrarLoja} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
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
});

export default CadastrarLojaScreen;