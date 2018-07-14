import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
} from 'react-native';
import { backgroundColor } from '../styles/colors.js';
import { Card, Button } from 'react-native-elements';
import {
  Ionicons,
  MaterialIcons,
  Entypo,
  FontAwesome
} from '@expo/vector-icons';

export default class Menu extends React.Component {
  onNavigate = screen => {
    const { navigate } = this.props.navigation;
    navigate(screen);
  };
  renderCard(key) {
    return (
      <Card key={key}>
        <Text>No Animations</Text>
      </Card>
    );
  }
  menuDisplay() {
    return (
      <View style={styles.container}>
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => this.onNavigate('DeckView')}>
            <View style={[styles.menuStyle]}>
              <Ionicons
                name={'ios-list-box-outline'}
                style={[styles.iconStyle]}
              />
              <Text style={[styles.fontStyle]}>Deck List View</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onNavigate('CreateADeck')}>
            <View style={[styles.menuStyle]}>
              <Ionicons name={'ios-create'} style={[styles.iconStyle]} />
              <Text style={[styles.fontStyle]}>Create Deck</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[styles.menuStyle]}>
              <Entypo name="add-to-list" style={[styles.iconStyle]} />
              <Text style={[styles.fontStyle]}>Quiz</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[styles.menuStyle]}>
              <FontAwesome name={'hand-pointer-o'} style={[styles.iconStyle]} />
              <Text style={[styles.fontStyle]}>Select a Deck</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[styles.menuStyle]}>
              <MaterialIcons
                name={'create-new-folder'}
                style={[styles.iconStyle]}
              />
              <Text style={[styles.fontStyle]}>Create a Quiz</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  render() {
    return this.menuDisplay();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuStyle: {
    height: 150,
    width: 150,
    backgroundColor: '#7DE2D5',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    marginLeft: 22,
    borderRadius: 10
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  menu1: {
    backgroundColor: '#7DE2D5'
  },
  fontStyle: {
    color: '#fff'
  },
  iconStyle: {
    color: '#fff',
    fontSize: 50
  }
});
