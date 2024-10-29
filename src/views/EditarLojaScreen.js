import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import api from '../services/axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EditarLojaScreen = ({ route, navigation }) => {
  const { idLoja } = route.params;  // Recebe o idLoja via navegação
  const [nomeLoja, setNomeLoja] = useState('');
  const [localizacao, setLocalizacaoLoja] = useState('');
  const [idUsuario, setIdUsuario] = useState('');
  const [loading, setLoading] = useState(true);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchLoja = async () => {
      try {
        const response = await api.get(`/api/Loja/RetornarLojaPorId?idLoja=${idLoja}`);
        if (response.status === 200) {
          const loja = response.data;
          setNomeLoja(loja.nomeLoja);
          setLocalizacaoLoja(loja.localizacao);
          setIdUsuario(loja.idUsuario);
        } else {
          Alert.alert('Erro', 'Não foi possível carregar os dados da loja.');
        }
      } catch (error) {
        console.error('Erro ao buscar loja:', error);
        Alert.alert('Erro', 'Erro ao carregar os dados da loja.');
      } finally {
        setLoading(false);
      }
    };

    // Função para buscar os produtos da loja
    const fetchProdutos = async () => {
      try {
        const response = await api.get(`/api/Produto/RetornarProdutosPorIdLoja?idLoja=${idLoja}`);
        if (response.status === 200) {
          setProdutos(response.data);
        } else {
          Alert.alert('Erro', 'Não foi possível carregar os produtos da loja.');
        }
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        Alert.alert('Erro', 'Erro ao carregar os produtos da loja.');
      }
    };

    const unsubscribe = navigation.addListener('focus', () => {
      fetchLoja();
      fetchProdutos();
    });

    return unsubscribe;

  }, [navigation, idLoja]);

  const handleAtualizarLoja = async () => {
    try {
      const response = await api.post(`/api/Loja/AtualizarLoja`, {
        idLoja,
        nomeLoja,
        localizacao,
        idUsuario
      });

      if (response.status === 200) {
        Alert.alert('Sucesso', 'Loja atualizada com sucesso!');
        navigation.goBack(); // Retorna para a tela anterior após salvar
      } else {
        Alert.alert('Erro', 'Erro ao atualizar a loja.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao atualizar a loja.');
    }
  };

  const handleAdicionarProduto = () => {
    navigation.navigate('CadastrarProdutoScreen', { idLoja });
  };

  const handleEditarProduto = (idProduto) => {
    navigation.navigate('EditarProdutoScreen', { idProduto });
  };

  const handleRemoverProduto = async (idProduto) => {
    try {
      const response = await api.delete(`/api/Produto/DeletarProdutoPorId/${idProduto}`);
      if (response.status === 200) {
        Alert.alert('Sucesso', 'Produto removido com sucesso!');
        setProdutos(produtos.filter((produto) => produto.idProduto !== idProduto));
      } else {
        Alert.alert('Erro', 'Erro ao remover o produto.');
      }
    } catch (error) {
      console.error('Erro ao remover o produto:', error);
      Alert.alert('Erro', 'Erro ao remover o produto.');
    }
  };

  const renderProduto = ({ item }) => (
    <View style={styles.productCard}>
      <Text style={styles.productName}>{item.nomeProduto}</Text>
      <Text style={styles.productDescription}>{item.descricao}</Text>
      <Text style={styles.productDescription}>{item.quantidade}</Text>
      <Text style={styles.productDescription}>{item.preco.toFixed(2)}</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => handleEditarProduto(item.idProduto)}>
          <Icon name="edit" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRemoverProduto(item.idProduto)}>
          <Icon name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Loja</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da Loja"
        value={nomeLoja}
        onChangeText={setNomeLoja}
      />
      <TextInput
        style={styles.input}
        placeholder="Localização da Loja"
        value={localizacao}
        onChangeText={setLocalizacaoLoja}
      />
      <Button title="Salvar Alterações" onPress={handleAtualizarLoja} />

      <Text style={styles.sectionTitle}>Produtos da Loja</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.idProduto.toString()}
        renderItem={renderProduto}
        contentContainerStyle={styles.productList}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Nome do Produto</Text>
            <Text style={styles.headerText}>Descrição</Text>
            <Text style={styles.headerText}>Quantidade</Text>
            <Text style={styles.headerText}>Preço</Text>
            <Text style={styles.headerText}></Text>
            {/* Adicione mais colunas, se necessário */}
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAdicionarProduto}>
        <Text style={styles.addButtonText}>Adicionar Produto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  productList: {
    paddingBottom: 20,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    flex: 1, // Define uma largura flexível para as colunas
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

export default EditarLojaScreen;