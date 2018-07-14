import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Flashcard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.font}>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 400,
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 10, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    marginBottom: 36
  },
  font: {
    fontSize: 45,
    fontWeight: 'bold'
  }
});

export default Flashcard;
