import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createProduto } from '../services/ProdutoSevice';

const CadastrarProdutoScreen = ({ navigation, route }) => {
  const { idLoja } = route.params;
  const [nomeProduto, setNomeProduto] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const handleCadastro = async () => {
    if (!nomeProduto || !descricao || !preco || !quantidade) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const produto = {
      nomeProduto,
      descricao,
      preco: parseFloat(preco),
      quantidade: parseInt(quantidade, 10),
      idLoja
    };

    try {
      await createProduto(produto);
      Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');
      navigation.navigate('EditarLojaScreen', { idLoja, refresh: true });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar o produto.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Produto</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={nomeProduto}
        onChangeText={setNomeProduto}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        keyboardType="decimal-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />
      <Button title="Cadastrar" onPress={handleCadastro} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default CadastrarProdutoScreen;