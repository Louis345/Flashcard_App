import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import DisplayCardList from '../components/displayCardList';
import { HOC } from '../components/HOC/FlipCardHOC';
const DisplayCardListWithDelete = HOC(DisplayCardList);
import getData from '../config/fetchData';

export default class DeckView extends React.Component {
  state = { quizCards: [], cardSize: [], isCardDeleting: false };

  componentDidMount() {
    const list = getData.getDecks();

    getData.getDeckSize(size => {
      list.then(quizCards => {
        let filteredKeys = getData.removeNotificationSync(quizCards);
        this.setState({ quizCards: filteredKeys, cardSize: size });
      });
    });
  }
  onNavigate = quizName => {
    getData.getDeck(quizName);
    this.props.navigation.navigate('CardOptions', quizName);
  };

  quizCardSize = quizName => {
    const cardSize = getData.getDeckSize(quizName);
    return cardSize;
  };

  deleteCard = title => {
    const { quizCards } = this.state;
    getData.removeDeck(title, () => {
      this.setState({
        isCardDeleting: !this.state.isCardDeleting,
        quizCards: quizCards.filter(quizTitle => quizTitle !== title)
      });
    });
  };

  render() {
    const { quizCards } = this.state;

    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          borderRadius: 4,
          borderWidth: 0.5,
          borderColor: '#d6d7da'
        }}
      >
        <View style={styles.container}>
          {quizCards.map((quizName, index) => (
            <DisplayCardListWithDelete
              key={index}
              listName={quizName}
              quizSize={this.state.cardSize[index]}
              onPress={() =>
                this.onNavigate([quizName, this.state.cardSize[index]])
              }
              deleteCard={title => this.deleteCard(title, index)}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B6293',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
});
