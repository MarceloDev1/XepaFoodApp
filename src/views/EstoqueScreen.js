import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet, FlatList, Alert } from "react-native";
import api from '../services/axios';

const EstoqueScreen = () => {
  const [estoque, setEstoque] = useState([]);
  const [idLoja, setIdLoja] = useState("");
  const [idProduto, setIdProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");

  // Função para buscar estoque por loja
  const buscarEstoquePorLoja = async () => {
    try {
      const response = await api.get(`/api/Estoque/RetornarEstoquePorIdLoja/${idLoja}`);
      setEstoque(response.data);
    } catch (error) {
      console.error('Erro ao buscar estoque:', error);
      Alert.alert("Erro", "Não foi possível buscar o estoque.");
    }
  };

  // Função para inserir estoque
  const inserirEstoque = async () => {
    try {
      await api.post('/api/Estoque/InserirEstoque', {
        idLoja,
        idProduto,
        quantidade
      });
      Alert.alert("Sucesso", "Estoque inserido com sucesso!");
      buscarEstoquePorLoja(); // Atualiza a lista
    } catch (error) {
      console.error('Erro ao inserir estoque:', error);
      Alert.alert("Erro", "Não foi possível inserir o estoque.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciamento de Estoque</Text>

      <TextInput
        style={styles.input}
        placeholder="ID da Loja"
        value={idLoja}
        onChangeText={setIdLoja}
      />
      <TextInput
        style={styles.input}
        placeholder="ID do Produto"
        value={idProduto}
        onChangeText={setIdProduto}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />

      <Button title="Inserir Estoque" onPress={inserirEstoque} />

      <Button title="Buscar Estoque por Loja" onPress={buscarEstoquePorLoja} />

      <FlatList
        data={estoque}
        keyExtractor={(item) => `${item.idLoja}-${item.idProduto}`}
        renderItem={({ item }) => (
          <View style={styles.estoqueItem}>
            <Text>Produto ID: {item.idProduto}</Text>
            <Text>Quantidade: {item.quantidade}</Text>
          </View>
        )}
      />
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
  estoqueItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default EstoqueScreen;