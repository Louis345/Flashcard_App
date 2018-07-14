import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity
} from 'react-native';

export default class Card extends Component {
  state = {
    front: true,
    back: false,
    value: null
  };

  componentWillMount() {
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
  flipToFront() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start(() => {
        this.setState({
          front: true,
          back: false
        });
      });
    }
  }

  flipToBack() {
    if (this.value < 90) {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
      }).start(() => {
        this.setState({
          back: true,
          front: false
        });
      });
    }
  }
  componentDidUpdate(nextProps, nextState) {
    if (this.props.backSide && !this.state.back) {
      this.flipToBack();
    }
    if (!this.props.backSide) {
      this.flipToFront();
    }
  }
  render() {
    const frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }]
    };
    const backAnimatedStyle = {
      transform: [{ rotateY: this.backInterpolate }]
    };

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
          <Text style={styles.card}>{this.props.front}</Text>
        </Animated.View>
        <Animated.View
          style={[backAnimatedStyle, styles.flipCard, styles.back]}
        >
          <Text style={styles.card}>{this.props.back}</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  flipCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    width: 300,
    height: 200,
    backfaceVisibility: 'hidden'
  },
  back: {
    position: 'absolute',
    backfaceVisibility: 'hidden'
  }
});
