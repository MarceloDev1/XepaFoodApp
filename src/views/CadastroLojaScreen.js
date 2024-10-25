import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import api from '../services/axios';
import { useAuth } from '../context/AuthContext';

const CadastroLojaScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [nomeLoja, setNomeLoja] = useState('');
  const [localizacao, setLocalizacao] = useState('');

  const handleCadastrarLoja = async () => {
    if (!nomeLoja || !localizacao) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        return;
    }
    
    try {
        const response = await api.post('/api/Loja/CriarLoja', {
            idUsuario: user.idUsuario,
        nomeLoja,
        localizacao,
    });
    
    if (response.status === 200) {
        Alert.alert('Sucesso', 'Loja cadastrada com sucesso!');        
        navigation.navigate('FeiranteScreen', { refresh: true }); // Volta para a tela anterior
      } else {
        Alert.alert('Erro', 'Não foi possível cadastrar a loja.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar loja:', error);
      Alert.alert('Erro', 'Erro ao cadastrar a loja.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Nova Loja</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da Loja"
        value={nomeLoja}
        onChangeText={setNomeLoja}
      />
      <TextInput
        style={styles.input}
        placeholder="Localização"
        value={localizacao}
        onChangeText={setLocalizacao}
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastrarLoja}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CadastroLojaScreen;