import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import jisho from '../util/japaneseUtil';
import { FormInput } from 'react-native-elements';
import axios from 'axios';
import { Table, Row, Rows } from 'react-native-table-component';
export default class Dictionary extends React.Component {
  state = {
    lookUp: '',
    translation: '',
    loading: false,
    tableHead: ['English', 'Japanese']
  };
  componentDidMount() {
    jisho.searchForExamples('日').then(result => {
      console.log('Jisho Uri: ' + result.uri);
      console.log();
      for (let i = 0; i < 3; ++i) {
        let example = result.results[i];
        console.log(example.kanji);
        console.log(example.kana);
        console.log(example.english);
        console.log();
      }
    });
  }
  getTranslation = word => {
    const { translation } = this.state;
    this.setState({
      loading: true
    });
    axios
      .get(`http://jisho.org/api/v1/search/words?keyword=${word}`)
      .then(response => {
        console.log(response);
        this.setState({
          translation: response.data.data,
          loading: false
        });
      });
  };

  renderTableList = () => {
    const { translation, tableData, tableHead } = this.state;

    return (
      translation && (
        <View>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
            <Rows
              data={translation.map(words => [
                words.senses[0].english_definitions,
                words.japanese[0].reading
              ])}
            />
          </Table>
        </View>
      )
    );
  };

  render() {
    const { loading } = this.state;
    return loading ? (
      <View>
        <Text>Loading</Text>
      </View>
    ) : (
      <View>
        <FormInput
          placeholder="Enter word"
          onEndEditing={e => this.getTranslation(e.nativeEvent.text)}
        />
        {this.renderTableList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff'
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});
