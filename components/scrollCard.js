import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { EvilIcons, Feather, MaterialIcons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;

const xOffset = new Animated.Value(0);

export default class ScrollCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flashcards: null,
      timer: 0,
      isWaiting: false,
      loaded: false,
      value: null,
      sideA: false
    };
  }

  componentWillMount() {
    this.setState({
      flashcards: ['konichiwa', 'hi', 'genki desu', 'how are you']
    });

    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
      this.setState({ value });
    });
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    });
  }

  renderCard() {
    let frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }]
    };
    let backAnimatedStyle = {
      transform: [{ rotateY: this.backInterpolate }]
    };

    return this.state.flashcards.map((question, index) => {
      return (
        <View key={index}>
          <TouchableOpacity>
            <View style={styles.scrollPage}>
              <View>
                <Animated.View
                  style={[
                    frontAnimatedStyle,
                    styles.screen,
                    this.transitionAnimation(index)
                  ]}
                >
                  <Text style={styles.text}>
                    {this.state.flashcards[index]}
                  </Text>
                </Animated.View>
                <Animated.View
                  style={[
                    styles.screen,
                    backAnimatedStyle,
                    styles.back,
                    this.transitionAnimation(index)
                  ]}
                >
                  <Text style={styles.text}>
                    {this.state.flashcards[index + 1]}
                  </Text>
                </Animated.View>
              </View>
            </View>
            <View style={styles.iconStyle}>
              <TouchableOpacity>
                <EvilIcons name="check" size={80} color={'#5CAF25'} />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons name="cancel" size={70} color={'#b71621'} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      );
    });
  }
  transitionAnimation = index => {
    return {
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
    };
  };
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            alignItems: 'flex-end',
            marginTop: 10
          }}
        />
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: xOffset } } }],
            { useNativeDriver: false }
          )}
          horizontal
          pagingEnabled
          style={styles.scrollView}
        >
          {this.state.flashcards && this.renderCard()}
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  scrollView: {
    flexDirection: 'row',
    backgroundColor: 'black'
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
    width: 300,
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
