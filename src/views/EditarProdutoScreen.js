import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import api from '../services/axios';

const EditarProdutoScreen = ({ route, navigation }) => {
  const { idProduto } = route.params;  // Recebe o idProduto via navegação
  const [nomeProduto, setNomeProduto] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await api.get(`/api/Produto/RetornarProdutosPorId?idProduto=${idProduto}`);
        if (response.status === 200) {
          const produto = response.data;
          setNomeProduto(produto.nomeProduto);
          setDescricao(produto.descricao);
          setQuantidade(produto.quantidade.toString());
          setPreco(produto.preco.toString());
        } else {
          Alert.alert('Erro', 'Não foi possível carregar os dados do produto.');
        }
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
        Alert.alert('Erro', 'Erro ao carregar os dados do produto.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduto();
  }, [idProduto]);

  const handleAtualizarProduto = async () => {
    try {
      const response = await api.put(`/api/Produto/AtualizarProdutoPorId`, {
        idProduto,
        nomeProduto,
        descricao,
        quantidade: parseInt(quantidade),
        preco: parseFloat(preco),
      });

      if (response.status === 200) {
        Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
        navigation.goBack(); // Retorna para a tela anterior após salvar
      } else {
        Alert.alert('Erro', 'Erro ao atualizar o produto.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao atualizar o produto.');
    }
  };

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Produto</Text>

      <Text style={styles.label}>Nome do Produto</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={nomeProduto}
        onChangeText={setNomeProduto}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Quantidade</Text>
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Preço</Text>
      <TextInput
        style={styles.input}
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
      />

      <Button title="Salvar Alterações" onPress={handleAtualizarProduto} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default EditarProdutoScreen;