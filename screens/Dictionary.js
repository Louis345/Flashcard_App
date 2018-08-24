import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { FormInput } from 'react-native-elements';
import axios from 'axios';
import {
  Table,
  Row,
  TableWrapper,
  Rows,
  Cell
} from 'react-native-table-component';
export default class Dictionary extends React.Component {
  state = {
    lookUp: '',
    translation: '',
    loading: false,
    tableHead: ['English', 'Japanese']
  };

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
    const { translation } = this.state;
    const tableHead = ['Japanese', 'English'];

    return (
      translation && (
        <ScrollView style={styles.dataWrapper}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
            <TableWrapper>
              {translation.map((words, idx) => {
                return (
                  <TouchableOpacity onPress={() => console.log(idx)}>
                    <Row
                      data={[
                        words.senses[0].english_definitions,
                        words.japanese[0].reading
                      ]}
                    />
                  </TouchableOpacity>
                );
              })}
            </TableWrapper>
          </Table>
        </ScrollView>
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
  text: { margin: 6 },
  dataWrapper: { marginBottom: 15 }
});
