import React from 'react';
import { View } from 'react-native';
export const HOC = PassedComponent =>
  class HOC extends React.Component {
    render() {
      return (
        <View>
          <PassedComponent {...this.props} />;
        </View>
      );
    }
  };
