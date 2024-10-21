import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

const CustomButton = ({ title, onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <Button title={title} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
  },
});

export default CustomButton;