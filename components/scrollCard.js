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

export default class scrollCard extends Component {
  renderCard() {
    return this.state.flashcards.map((question, index) => {
      return (
        <View key={index}>
          <TouchableOpacity>
            <View style={styles.scrollPage}>
              <View>
                <Animated.View style={this.transitionAnimation(index)}>
                  <Text style={styles.text}>test</Text>
                </Animated.View>
                <Animated.View style={this.transitionAnimation(index)}>
                  <Text style={styles.text}>test</Text>
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

  render() {
    const { list, children } = this.props;
    return (
      <View style={styles.container}>
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
          {children}
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  scrollView: {
    flexDirection: 'row',
    backgroundColor: backgroundColor
  }
});
