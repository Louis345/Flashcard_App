import React from 'React';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import {
  FormLabel,
  FormInput,
  Button,
  KeyboardAvoidingView
} from 'react-native-elements';
import fetchData from '../config/fetchData';
import Cards from '../components/Card';

export default class CreateADeck extends React.Component {
  state = {
    title: ''
  };

  setTitle = e => {
    fetchData.checkSavedTitles(this.state.title, status => {
      if (status != -1) {
        alert('The title is already in Use');
      } else {
        let status = fetchData.saveDeckTitle(this.state.title, response => {
          let title = this.state.title;
          response && this.setState({ title: '' });
          alert('Title saved');
          this.props.navigation.navigate('CardOptions', [title, 0]);
        });
      }
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <FormLabel>Create A Deck</FormLabel>
        <FormInput
          containerStyle={{ marginBottom: 45 }}
          inputStyle={{ color: '#fff' }}
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
          autoComplete={false}
          autoCorrect={false}
        />
        <Button
          onPress={() => {
            Keyboard.dismiss();
            if (this.state.title) {
              this.setTitle();
            } else {
              alert('Please Enter a title');
            }
          }}
          title="Create A deck"
          buttonStyle={{
            backgroundColor: '#4B86A6',
            borderRadius: 10
          }}
          titleStyle={{ color: 'red' }}
          textStyle={{ textAlign: 'center' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#4B6293'
  }
});
