import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import fetchData from '../config/fetchData';
import { Keyboard } from 'react-native';
import { backgroundColor, buttonColor, lightCyan } from '../styles/colors.js';
export default class CardOptions extends React.Component {
  onNavigate = () => {
    const { navigate } = this.props.navigation;

    navigate('CreateCard', this.props.navigation.state.params);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'flex-end' }}>
          <MaterialIcons
            name={'delete'}
            style={{ fontSize: 30, color: buttonColor }}
            onPress={() => {
              fetchData.removeDeck(
                this.props.navigation.state.params[0],
                () => {
                  this.props.navigation.navigate('DeckView');
                }
              );
            }}
          />
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.textStyle}>
              {this.props.navigation.state.params[0]}
            </Text>
            <MaterialCommunityIcons
              name={'account-card-details'}
              style={styles.iconStyle}
            />
            <Text style={styles.textStyle}>
              {`${this.props.navigation.state.params[1]} Cards In Deck`}
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-around' }}
          >
            <Button
              raised
              onPress={this.onNavigate}
              title="Add A Card"
              buttonStyle={{ backgroundColor: '#36414b', color: lightCyan }}
            />
            <Button
              raised
              onPress={() => {
                if (this.props.navigation.state.params[1] <= 0) {
                  alert('Please Enter Cards in your deck');
                }
                if (this.props.navigation.state.params[1] > 0) {
                  this.props.navigation.navigate(
                    'startQuiz',
                    this.props.navigation.state.params
                  );
                }
              }}
              title="Start Quiz"
              buttonStyle={{ backgroundColor: '#36414b' }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
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
  iconStyle: {
    color: backgroundColor,
    fontSize: 100
  },
  textStyle: {
    color: backgroundColor,
    fontSize: 25,
    fontWeight: 'bold',
    margin: 2
  }
});
