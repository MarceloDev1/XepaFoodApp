import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../services/axios';

const HomeScreen = ({ navigation }) => {
  const [localizacao, setLocalizacao] = useState('');
  const [produto, setProduto] = useState('');
  const [resultados, setResultados] = useState([]);

  const handlePesquisa = async () => {
    try {
      const response = await api.get(`/api/Estoque/RetornarEstoque`, {
        params: {
          nomeProduto: produto,
          localizacao: localizacao,
        },
      });
      setResultados(response.data);
      console.log("Resultado da pesquisa:", response.data);
    } catch (error) {
      console.error("Erro ao pesquisar:", error);
      Alert.alert("Erro", "Não foi possível realizar a pesquisa.");
    }
  };

  const handleEdit = (idLoja) => {
    console.log(idLoja);
    navigation.navigate('EditarLojaScreen', { idLoja });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Home!</Text>

      <TextInput
        style={styles.input}
        placeholder="Localização"
        value={localizacao}
        onChangeText={setLocalizacao}
      />

      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={produto}
        onChangeText={setProduto}
      />

      <TouchableOpacity style={styles.searchButton} onPress={handlePesquisa}>
        <Icon name="search" size={24} color="#fff" />
        <Text style={styles.searchButtonText}>Pesquisar</Text>
      </TouchableOpacity>

      {resultados.length > 0 ? (
        <FlatList
          data={resultados}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => handleEdit(item.idLoja)}  // Usa handleEdit ao clicar no cartão
            >
              <Text style={styles.resultText}>Nome da Loja: {item.nomeLoja}</Text>
              <Text style={styles.resultText}>Localização: {item.localizacao}</Text>
            </TouchableOpacity>
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
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginVertical: 5,
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