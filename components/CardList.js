import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Button
} from 'react-native';
import Modal from 'react-native-modal';
import { buttonColor, backgroundColor, lightCyan } from '../styles/colors';
import { EvilIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import fetchData from '../config/fetchData';

const SCREEN_WIDTH = Dimensions.get('window').width;
let xOffset = new Animated.Value(0);
export default class QuizCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flipping: false,
      count: 0,
      showModal: false
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
    let { width } = Dimensions.get('window');
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

  renderModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };
  renderModalContent = () => {
    return (
      <View style={styles.modalContent}>
        <FontAwesome name="warning" size={70} color={'#f8bb86'} />
        <Text style={styles.modalTitle}>Are you sure?</Text>
        <Text style={styles.modalBottomText}>
          Once deleted, you will not be able to recover the card!
        </Text>
        <View style={styles.modalButtonsContainer}>
          <TouchableOpacity
            onPress={this.renderModal}
            style={styles.modalButtonCancel}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButtonOk}>
            <Text>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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
    const { showModal } = this.state;
    return (
      <View style={styles.container}>
        <Modal
          isVisible={showModal}
          backdropColor={'#ddd'}
          backdropOpacity={0.5}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={1000}
          backdropTransitionOutTiming={1000}
        >
          {this.renderModalContent()}
        </Modal>
        <TouchableOpacity
          style={{
            justifyContent: 'flex-end',
            flexDirection: 'row',
            alignSelf: 'stretch',
            marginRight: 25,
            marginTop: 10
          }}
          onPress={this.renderModal}
        >
          <FontAwesome name="edit" size={25} color={buttonColor} />
        </TouchableOpacity>
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
  modalContent: {
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    flex: 0.5,
    marginTop: 50
  },
  modalTitle: {
    color: 'rgba(0, 0, 0, .65)',
    fontWeight: 'bold',
    fontSize: 27
  },
  modalBottomText: {
    fontSize: 16,
    fontWeight: '400',
    flexWrap: 'wrap',
    padding: 20
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around'
  },
  modalButtonCancel: {
    borderRadius: 4,
    backgroundColor: '#efefef',
    padding: 15,
    marginRight: 15
  },
  modalButtonOk: {
    borderRadius: 4,
    backgroundColor: '#e64942',
    padding: 15
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
