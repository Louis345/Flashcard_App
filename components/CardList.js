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

import { EvilIcons, MaterialIcons } from '@expo/vector-icons';
import { backgroundColor } from '../styles/colors';
import fetchData from '../config/fetchData';

const SCREEN_WIDTH = Dimensions.get('window').width;
let xOffset = new Animated.Value(0);
export default class QuizCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flipping: false,
      count: 0
    };

    this.flipValue = new Animated.Value(0);

    this.frontAnimatedStyle = {
      transform: [
        {
          rotateY: this.flipValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg']
          })
        }
      ]
    };

    this.backAnimatedStyle = {
      transform: [
        {
          rotateY: this.flipValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['180deg', '360deg']
          })
        }
      ]
    };
  }

  componentDidMount() {
    xOffset = new Animated.Value(0);
    counter = 0;
    const quizCards = fetchData.getDeck(this.props.navigation.state.params[0]);
    quizCards.then(card => {
      const quizData = JSON.parse(card);
      this.setState({ flashcards: quizData.question }, () => {
        this.setState({
          flipped: this.state.flashcards.map(() => false),
          deckLength: this.state.flashcards.length
        });
      });
    });

    this.onScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { x: xOffset } } }],
      {
        useNativeDriver: false
      }
    );
  }

  scrollToNextCard = () => {
    let { height, width } = Dimensions.get('window');
    const { deckLength, count } = this.state;
    const cardPosition =
      count === deckLength ? this.setState({ count: 0 }) : count;
    let cardIndex = this.state.flashcard;
    this.scrollView.getNode().scrollTo({
      x: cardPosition * width,
      y: 0,
      animated: true
    });
  };

  renderCard = (question, index) => {
    const { flashcards } = this.state;
    flashcards &&
      (this.transitionAnimations = this.state.flashcards.map((card, index) => ({
        transform: [
          { perspective: 800 },
          {
            scale: xOffset.interpolate({
              inputRange: [
                (index - 1) * SCREEN_WIDTH,
                index * SCREEN_WIDTH,
                (index + 1) * SCREEN_WIDTH
              ],
              outputRange: [0.25, 1, 0.25]
            })
          },
          {
            rotateX: xOffset.interpolate({
              inputRange: [
                (index - 1) * SCREEN_WIDTH,
                index * SCREEN_WIDTH,
                (index + 1) * SCREEN_WIDTH
              ],
              outputRange: ['45deg', '0deg', '45deg']
            })
          },
          {
            rotateY: xOffset.interpolate({
              inputRange: [
                (index - 1) * SCREEN_WIDTH,
                index * SCREEN_WIDTH,
                (index + 1) * SCREEN_WIDTH
              ],
              outputRange: ['-45deg', '0deg', '45deg']
            })
          }
        ]
      })));

    if (this.state.flipped) {
      console.log('flipping');
      const isFlipped = this.state.flipped[index];
      return (
        <View>
          <View style={styles.scrollPage}>
            <TouchableWithoutFeedback
              key={index}
              onPress={() => this.flipCard(index)}
            >
              <View>
                {(this.state.flipping || !isFlipped) && (
                  <Animated.View
                    style={[
                      this.state.flipping
                        ? this.frontAnimatedStyle
                        : this.transitionAnimations[index],
                      styles.screen
                    ]}
                  >
                    <Text style={styles.text}>
                      {this.state.flashcards[index].question}
                    </Text>
                  </Animated.View>
                )}

                {(this.state.flipping || isFlipped) && (
                  <Animated.View
                    style={[
                      styles.screen,
                      this.state.flipping
                        ? this.backAnimatedStyle
                        : this.transitionAnimations[index],
                      this.state.flipping && styles.back
                    ]}
                  >
                    <Text style={styles.text}>
                      {this.state.flashcards[index].answer}
                    </Text>
                  </Animated.View>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.iconStyle}>
            <TouchableOpacity>
              <EvilIcons
                name="check"
                onPress={() =>
                  this.setState(
                    {
                      count: this.state.count + 1
                    },
                    () => {
                      this.scrollToNextCard();
                    }
                  )
                }
                size={80}
                color={'#5CAF25'}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="cancel" size={70} color={'#b71621'} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  flipCard = index => {
    if (this.state.flipping) return;

    let isFlipped = this.state.flipped[index];
    let flipped = [...this.state.flipped];
    flipped[index] = !isFlipped;

    this.setState({
      flipping: true,
      flipped
    });

    this.flipValue.setValue(isFlipped ? 1 : 0);
    Animated.spring(this.flipValue, {
      toValue: isFlipped ? 0 : 1,
      friction: 8,
      tension: 10
    }).start(() => {
      this.setState({ flipping: false });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Animated.ScrollView
          scrollEnabled={!this.state.flipping}
          scrollEventThrottle={16}
          onScroll={this.onScroll}
          horizontal
          pagingEnabled
          style={styles.scrollView}
          ref={ref => (this.scrollView = ref)}
        >
          {this.state.flashcards && this.state.flashcards.map(this.renderCard)}
        </Animated.ScrollView>
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
