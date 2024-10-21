import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Home!</Text>
      
      {/* Navegação para cadastrar produtos */}
      <Button 
        title="Cadastrar Produto" 
        onPress={() => navigation.navigate('CadastrarProduto')} 
      />

      {/* Navegação para gerenciar estoque */}
      <Button 
        title="Gerenciar Estoque" 
        onPress={() => navigation.navigate('Estoque')} 
      />

      {/* Outras funcionalidades */}
      <Button 
        title="Gerenciar Usuários" 
        onPress={() => navigation.navigate('GerenciarUsuarios')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default HomeScreen;