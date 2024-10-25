import React, { useEffect, useState } from 'react';
import { CheckBox, View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import api from '../services/axios';
import { useAuth } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FeiranteScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [lojas, setLojas] = useState([]);

  useEffect(() => {    
    const unsubscribe = navigation.addListener('focus', () => {
      fetchLojas(); // Atualiza as lojas quando a tela é focada
    });

    return unsubscribe; // Limpa o listener ao desmontar
  }, [navigation]);


  const handleEdit = (idLoja) => {
    console.log(idLoja);
    navigation.navigate('EditarLojaScreen', { idLoja });
  };

  const handleDelete = async (idLoja) => {
    try {
      const response = await api.post(`/api/Loja/ExcluirLoja?idLoja=${idLoja}`);

      if (response.status === 200) {
        Alert.alert('Sucesso', `Loja com ID: ${idLoja} foi deletada.`);
        // Remove a loja da lista de lojas localmente
        fetchLojas();
      } else {
        Alert.alert('Erro', 'Não foi possível deletar a loja.');
      }
    } catch (error) {
      console.error('Erro ao deletar a loja:', error);
      Alert.alert('Erro', 'Erro ao deletar a loja.');
    }
  };

  const fetchLojas = async () => {
    try {
      const response = await api.get(`/api/Loja/RetornarLojaPorIdUsuario?idUsuario=${user.idUsuario}`);
      if (response.status === 200) {
        setLojas(response.data);
      } else {
        Alert.alert('Erro', 'Não foi possível carregar as lojas.');
      }
    } catch (error) {
      console.error('Erro ao buscar lojas:', error);
      Alert.alert('Erro', 'Erro ao carregar as lojas.');
    }
  };



  const renderLoja = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.cardTitle}>{item.nomeLoja}</Text>
        <Text style={styles.cardSubtitle}>{item.localizacao}</Text>
      </View>
      <TouchableOpacity onPress={() => handleEdit(item.idLoja)}>
        <Icon name="edit" size={24} color="blue" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete(item.idLoja)}>
        <Icon name="delete" size={24} color="red" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );

  const handleAddLoja = () => {
    navigation.navigate('CadastroLoja', { idUsuario: user.idUsuario });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lojas Disponíveis</Text>
      <FlatList
        data={lojas}
        keyExtractor={(item) => item.idLoja.toString()}
        renderItem={renderLoja}
        contentContainerStyle={styles.grid}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddLoja}>
        <Text style={styles.addButtonText}>Adicionar Loja</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  grid: {
    paddingBottom: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#777',
  },
  icon: {
    marginLeft: 10,
  },
  checkbox: {
    alignSelf: 'center'
  }
});

export default FeiranteScreen;