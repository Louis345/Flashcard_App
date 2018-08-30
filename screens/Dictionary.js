import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { FormInput, CheckBox, ListItem, List } from 'react-native-elements';
import Toaster, { ToastStyles } from 'react-native-toaster';
import axios from 'axios';
import fetchData from '../config/fetchData';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import { Table, Row, TableWrapper } from 'react-native-table-component';
import { backgroundColor } from '../styles/colors';

export default class Dictionary extends React.Component {
  state = {
    lookUp: '',
    translation: '',
    showDeckList: false,
    showModal: false,
    loading: false,
    flashcards: null,
    englishWord: null,
    japaneseWord: null,
    showSuccessMessage: false
  };

  componentDidMount() {
    const quizCards = fetchData.getDecks();
    quizCards.then(card => {
      const flashcardData = card.map(item => {
        return {
          key: item
        };
      });
      this.setState({ flashcards: flashcardData });
    });
  }
  renderModalContent = () => (
    <View style={styles.modalContent}>
      <CheckBox
        center
        title="Create a Flashcard"
        iconRight
        iconType="material"
        checkedIcon="clear"
        uncheckedIcon="add"
        checkedColor="red"
        checked={this.state.checked}
        onPress={() =>
          this.setState({
            showDeckList: true,
            showModal: false
          })
        }
      />
      <CheckBox
        center
        title="View Sample Setences"
        iconRight
        iconType="material"
        checkedIcon="clear"
        uncheckedIcon="add"
        checkedColor="red"
        checked={false}
        onPress={() => alert('test')}
      />
      {this.renderButton('Close', () => this.setState({ showModal: false }))}
    </View>
  );

  renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  createFlashCard = listName => {
    const { englishWord, japaneseWord } = this.state;
    fetchData.addCardToDeck(
      listName,
      {
        question: englishWord,
        answer: japaneseWord
      },
      this.setState({
        showSuccessMessage: true,
        showDeckList: false
      })
    );
  };

  getTranslation = word => {
    this.setState({
      loading: true
    });
    axios
      .get(`http://jisho.org/api/v1/search/words?keyword=${word}`)
      .then(response => {
        this.setState({
          translation: response.data.data,
          loading: false
        });
      });
  };

  displayModal = () => {
    this.setState({
      showModal: true
    });
  };

  renderTableList = () => {
    const { translation } = this.state;
    const tableHead = ['Japanese', 'English'];

    return (
      translation && (
        <ScrollView style={styles.dataWrapper}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row
              data={tableHead}
              style={styles.tableHeader}
              textStyle={styles.headerText}
            />
            <TableWrapper>
              {translation.map((words, idx) => {
                return (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        this.displayModal();
                        this.setState({
                          englishWord: words.senses[0].english_definitions[0],
                          japaneseWord: words.japanese[0].reading
                        });
                      }}
                    >
                      <Row
                        data={[
                          words.senses[0].english_definitions,
                          words.japanese[0].reading
                        ]}
                        textStyle={styles.tableText}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </TableWrapper>
          </Table>
        </ScrollView>
      )
    );
  };
  renderDeckList = () => {
    const { flashcards } = this.state;
    return (
      <View style={styles.container}>
        <List>
          <FlatList
            data={flashcards}
            renderItem={({ item }, i) => (
              <ListItem
                roundAvatar
                title={`${item.key}`}
                containerStyle={{ marginTop: 1 }}
                onPress={() => {
                  this.createFlashCard(item.key);
                }}
              />
            )}
          />
        </List>
      </View>
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: '#CED0CE',
          marginLeft: '14%'
        }}
      />
    );
  };
  render() {
    const { loading, showModal, showDeckList, showSuccessMessage } = this.state;
    return loading ? (
      <View>
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF' }}
        />
      </View>
    ) : (
      <View style={styles.container}>
        <View style={styles.modalContents}>
          <Modal
            isVisible={showModal}
            backdropColor={'#ddd'}
            backdropOpacity={0.5}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={1000}
            animationOutTiming={1000}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={1000}
          >
            {this.renderModalContent()}
          </Modal>
        </View>
        <FormInput
          placeholder="Enter word"
          onEndEditing={e => this.getTranslation(e.nativeEvent.text)}
        />
        {showDeckList ? this.renderDeckList() : this.renderTableList()}
        {showSuccessMessage && (
          <Toaster
            message={{ text: 'Sucess!!!!', styles: ToastStyles.success }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  modalContent: {
    backgroundColor: backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    flex: 0.7,
    marginTop: 50
  },
  tableHeader: {
    height: 50,
    backgroundColor: '#f1f8ff'
  },
  tableText: {
    margin: 5,
    padding: 5
  },
  headerText: {
    padding: 5
  },
  dataWrapper: {
    marginBottom: 20
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});
