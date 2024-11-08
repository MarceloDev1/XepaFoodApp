import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../services/axios';
import { useAuth } from '../context/AuthContext';

const ComprarScreen = ({ route, navigation }) => {
  const { idLoja } = route.params;
  const [produtos, setProdutos] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const { user } = useAuth(); //Aqui está causando problema para carregar a pagina 

  // Função para carregar os produtos ao abrir a tela
  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const response = await api.get(`/api/Produto/RetornarProdutosPorIdLoja`, {
        params: {
          idLoja
        },
      });
      // Adiciona um campo 'quantidadeComprada' inicializado em 0 para cada produto
      const produtosComQuantidade = response.data.map(produto => ({
        ...produto,
        quantidadeComprada: 0,
      }));
      setProdutos(produtosComQuantidade);
      console.log("Produtos carregados:", response.data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      Alert.alert("Erro", "Não foi possível carregar os produtos.");
    }
  };

  // Função para atualizar a quantidade de compra de um produto
  const alterarQuantidade = (index, operacao) => {
    setProdutos((prevProdutos) =>
      prevProdutos.map((produto, i) =>
        i === index
          ? {
              ...produto,
              quantidadeComprada: Math.max(
                0,
                Math.min(produto.quantidade, produto.quantidadeComprada + operacao)
              ),
            }
          : produto
      )
    );
  };

  // Função para processar a compra
  const handleComprar = async () => {
    const produtosParaComprar = produtos
      .filter(produto => produto.quantidadeComprada > 0)
      .map(produto => ({
        idProduto: produto.idProduto,
        quantidade: produto.quantidadeComprada,
        precoUnitario: produto.preco, 
      }));

    if (produtosParaComprar.length > 0) {
      const compra = {
        idUsuario: user?.idUsuario, //Aqui está causando problema para carregar a pagina 
        idStatusCompra: 0,
        produtos: produtosParaComprar,
      };

      try {
        const response = await api.post('/api/Compra/ComprarProduto', compra);
        if (response.status === 200) {
          Alert.alert("Sucesso", response.data.mensagem);
          navigation.goBack();
        } else {
          Alert.alert("Erro", "Erro ao tentar realizar a compra.");
        }
      } catch (error) {
        console.error("Erro ao comprar produtos:", error);
        Alert.alert("Erro", "Não foi possível concluir a compra.");
      }
    } else {
      Alert.alert("Aviso", "Selecione ao menos um produto para comprar.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Loja</Text>

      {/* Campo de pesquisa */}
      <TextInput
        style={styles.input}
        placeholder="Pesquisar Produto"
        value={pesquisa}
        onChangeText={setPesquisa}
      />

      {/* Botão de pesquisa */}
      <TouchableOpacity style={styles.searchButton} onPress={carregarProdutos}>
        <Icon name="search" size={24} color="#fff" />
        <Text style={styles.searchButtonText}>Pesquisar</Text>
      </TouchableOpacity>

      {/* Listagem de produtos */}
      {produtos.length > 0 ? (
        <FlatList
          data={produtos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.productItem}>
              <Text style={styles.productText}>Nome: {item.nomeProduto}</Text>
              <Text style={styles.productText}>Preço: R$ {item.preco.toFixed(2)}</Text>
              <Text style={styles.productText}>Descrição: {item.descricao}</Text>
              <Text style={styles.productText}>Disponível: {item.quantidade}</Text>

              {/* Controles de quantidade */}
              <View style={styles.counterContainer}>
                <TouchableOpacity onPress={() => alterarQuantidade(index, -1)}>
                  <Icon name="remove-circle-outline" size={24} color="#d9534f" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantidadeComprada}</Text>
                <TouchableOpacity onPress={() => alterarQuantidade(index, 1)}>
                  <Icon name="add-circle-outline" size={24} color="#5cb85c" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noResultsText}>Nenhum produto encontrado</Text>
      )}

      {/* Botão de comprar */}
      <TouchableOpacity style={styles.buyButton} onPress={handleComprar}>
        <Text style={styles.buyButtonText}>Comprar</Text>
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
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  productItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productText: {
    fontSize: 16,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  buyButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ComprarScreen;