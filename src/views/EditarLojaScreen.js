import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../services/axios';

const EditarLojaScreen = ({ route, navigation }) => {
  const { idLoja } = route.params;  // Recebe o idLoja via navegação
  const [nomeLoja, setNomeLoja] = useState('');
  const [localizacao, setLocalizacaoLoja] = useState('');
  const [idUsuario, setIdUsuario] = useState('');
  const [loading, setLoading] = useState(true);

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

    fetchLoja();
  }, [idLoja]);

  const handleCadastrarLoja = async () => {
    try {
      // Chamada à API para atualizar a loja
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
      <Button title="Salvar Alterações" onPress={handleCadastrarLoja} />
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
});

export default EditarLojaScreen;