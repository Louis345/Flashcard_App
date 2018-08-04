import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import fetchData from '../config/fetchData';
const displayCardList = props => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.onPress()}
      onLongPress={e => {
        props.deleteCard(props.listName);
      }}
    >
      <View style={styles.colorMarkContainer}>
        <View style={styles.colorMark} />
      </View>
      <Text style={styles.textStyle}>{props.listName}</Text>
      <Text style={styles.itemStyle}>{props.quizSize}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 50,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    width: 100,
    height: 100,
    shadowOffset: { width: 2, height: 2 },
    justifyContent: 'center'
  },
  colorMarkContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 10
  },
  colorMark: {
    borderRadius: 5,
    borderColor: '#1FB238',
    borderWidth: 2,
    height: 15,
    width: 15,
    marginRight: 10
  },
  textStyle: {
    marginLeft: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  itemStyle: {
    color: '#E2E4E1',
    textAlign: 'center',
    marginTop: 5
  }
});

export default displayCardList;
