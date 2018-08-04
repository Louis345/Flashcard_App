import React from 'react';
import { View } from 'react-native';
export const HOC = PassedComponent =>
  class HOC extends React.Component {
    animateCircle = () => {
      console.log('test');
    };
    render() {
      return (
        <View>
          <PassedComponent {...this.props} animateCircle={this.animateCircle} />;
        </View>
      );
    }
  };
