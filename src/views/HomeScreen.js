import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../services/axios';

const HomeScreen = ({ navigation }) => {
  const [localizacao, setLocalizacao] = useState('');
  const [produto, setProduto] = useState('');
  const [resultados, setResultados] = useState([]);  // Estado para armazenar o resultado da pesquisa

  const handlePesquisa = async () => {
    try {
      const response = await api.get(`/api/Estoque/RetornarEstoque`, {
        params: {
          nomeProduto: produto,
          localizacao: localizacao,
        },
      });
      
      // Atualiza o estado 'resultados' com a resposta da pesquisa
      setResultados(response.data);
      console.log("Resultado da pesquisa:", response.data);
    } catch (error) {
      console.error("Erro ao pesquisar:", error);
      Alert.alert("Erro", "Não foi possível realizar a pesquisa.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Home!</Text>

      {/* Filtro por localização */}
      <TextInput
        style={styles.input}
        placeholder="Localização"
        value={localizacao}
        onChangeText={setLocalizacao}
      />

      {/* Filtro por produto */}
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={produto}
        onChangeText={setProduto}
      />

      {/* Botão de pesquisa */}
      <TouchableOpacity style={styles.searchButton} onPress={handlePesquisa}>
        <Icon name="search" size={24} color="#fff" />
        <Text style={styles.searchButtonText}>Pesquisar</Text>
      </TouchableOpacity>

      {/* Exibe os resultados da pesquisa */}
      {resultados.length > 0 ? (
        <FlatList
          data={resultados}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.resultItem}>
              <Text style={styles.resultText}>Nome do Produto: {item.nomeProduto}</Text>
              <Text style={styles.resultText}>Descrição: {item.descricaoProduto}</Text>
              <Text style={styles.resultText}>Nome da Loja: {item.nomeLoja}</Text>
              <Text style={styles.resultText}>Localização: {item.localizacaoLoja}</Text>
              <Text style={styles.resultText}>Preço: R$ {item.preco}</Text>
              <Text style={styles.resultText}>Quantidade: {item.quantidade}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noResultsText}>Nenhum resultado encontrado</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    width: '100%',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  resultItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    width: '100%',
  },
  resultText: {
    fontSize: 16,
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
});

export default HomeScreen;