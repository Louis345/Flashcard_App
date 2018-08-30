import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

import { backgroundColor } from '../styles/colors';
import fetchData from '../config/fetchData';
import ScrollCard from '../components/scrollCard';
import Flashcard from '../components/Flashcard';

const SCREEN_WIDTH = Dimensions.get('window').width;
let xOffset = new Animated.Value(0);

export default class CardView extends Component {
  state = {
    flashcards: null
  };

  componentDidMount() {
    const quizCards = fetchData.getDecks();
    console.log(quizCards);
    quizCards.then(card => {
      const quizData = JSON.parse(card);
      this.setState({ flashcards: quizData.question });
    });
  }

  render() {
    const { flashcards } = this.state;
    return (
      <View style={styles.backgroundColor}>
        <ScrollCard list={flashcards}>
          {this.state.flashcards &&
            this.state.flashcards.map((question, idx) => {
              return <Flashcard />;
            })}
        </ScrollCard>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollView: {
    flexDirection: 'row',
    backgroundColor: backgroundColor
  },
  scrollPage: {
    width: SCREEN_WIDTH,
    padding: 20
  },
  screen: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'white',
    width: SCREEN_WIDTH - 20 * 2,
    backfaceVisibility: 'hidden'
  },
  text: {
    fontSize: 45,
    fontWeight: 'bold'
  },
  iconStyle: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  back: {
    position: 'absolute',
    top: 0,
    backfaceVisibility: 'hidden'
  }
});
