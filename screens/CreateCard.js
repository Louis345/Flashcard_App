import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import fetchData from '../config/fetchData';
import Card from '../components/Card';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { backgroundColor } from '../styles/colors';
export default class CreateCard extends React.Component {
  state = {
    front: '',
    back: '',
    frontSide: false,
    backSide: false
  };

  onNavigate = () => {
    const flashcardInfo = { ...this.props.navigation.state.params };
    flashcardInfo[1]++;

    this.props.navigation.navigate('CardOptions', flashcardInfo);
  };
  setQuestionAnswer = callback => {
    let response = fetchData.addCardToDeck(
      this.props.navigation.state.params[0],
      {
        question: this.state.front,
        answer: this.state.back,
        dueDate: null,
        consecutiveCorrectAnswer: 0,
        responseTime: 1000,
        correct: null
      }
    );
    callback();
  };

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
        <View
          style={{
            justifyContent: 'space-between',
            flex: 1,
            backgroundColor: backgroundColor
          }}
        >
          <Card
            front={this.state.front}
            back={this.state.back}
            frontSide={this.state.frontSide}
            backSide={this.state.backSide}
          />
          <FormInput
            placeholder="Front Side"
            autoComplete={false}
            autoCorrect={false}
            onChangeText={input => this.setState({ front: input })}
            onFocus={() => this.setState({ frontSide: true, backSide: false })}
          />
          <FormInput
            placeholder="Back Side"
            autoComplete={false}
            autoCorrect={false}
            onChangeText={input => this.setState({ back: input })}
            onFocus={() => this.setState({ backSide: true, frontSide: false })}
          />
          <Button
            medium
            icon={{ name: 'envira', type: 'font-awesome' }}
            title="Submit"
            backgroundColor="#4B86A6"
            borderRadius={100}
            onPress={() => {
              if (
                this.state.front.length === 0 ||
                this.state.back.length === 0
              ) {
                alert('Please Enter Valid Input');
              } else {
                this.setQuestionAnswer(() => {
                  this.setState({ question: '', answer: '' });
                  this.onNavigate();
                });
              }
            }}
            style={{ marginBottom: 10 }}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B6293'
  }
});
