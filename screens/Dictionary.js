import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';
export default class Dictionary extends React.Component {
  state = {
    lookUp: '',
    translation: ''
  };

  getTranslation = word => {
    console.log(word);
    const { translation } = this.state;
    axios
      .get(`http://jisho.org/api/v1/search/words?keyword=${word}`)
      .then(response => {
        this.setState({
          translation: response.data.data
        });
      });
  };

  renderTableList = () => {
    const { translation } = this.state;
    return (
      translation &&
      translation.map((words, idx) => {
        return (
          <View>
            <Text>
              {words.senses[0].english_definitions} {words.japanese[0].reading}
            </Text>
          </View>
        );
      })
    );
  };

  render() {
    return (
      <View>
        <FormInput
          placeholder="Front Side"
          onEndEditing={e => this.getTranslation(e.nativeEvent.text)}
        />
        {this.renderTableList()}
      </View>
    );
  }
}
