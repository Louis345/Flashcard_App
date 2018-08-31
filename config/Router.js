import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import Menu from '../screens/Menu';
import CardOptions from '../screens/CardOptions';
import CreateCard from '../screens/CreateCard';
import DeckView from '../screens/DeckView';
import CreateADeck from '../screens/CreateADeck';
import CardList from '../components/CardList';
import Dictionary from '../screens/Dictionary';
import {
  HeaderTextStyle,
  HeaderBackgroundColor,
  lightCyan
} from '../styles/colors';
import { Ionicons } from '@expo/vector-icons';

const createDeckNavigator = createStackNavigator({
  DeckView: {
    screen: CreateADeck,
    navigationOptions: ({ navigation }) => ({
      title: 'Create A Deck',
      headerTintColor: lightCyan,
      headerStyle: {
        backgroundColor: HeaderBackgroundColor
      },
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DeckView');
          }}
        >
          <Ionicons
            name={'ios-arrow-back'}
            onPress={() => {
              navigation.navigate('Home');
            }}
            style={{ fontSize: 30, margin: 5, color: 'blue' }}
          />
        </TouchableOpacity>
      )
    }),
    header: navigation => ({
      titleStyle: {
        color: '#2C2B50',
        fontFamily: 'MuseoSansRounded-300',
        fontWeight: '300',
        textAlign: 'center',
        marginRight: 56
      },
      tintColor: '#43c2f0'
    })
  }
});

const MainNavigator = createStackNavigator({
  Home: {
    screen: Menu,
    navigationOptions: ({ navigation }) => ({
      title: 'Menu',
      headerTintColor: lightCyan,
      headerStyle: {
        backgroundColor: HeaderBackgroundColor
      }
    }),
    header: navigation => ({
      titleStyle: {
        color: '#2C2B50',
        fontFamily: 'MuseoSansRounded-300',
        fontWeight: '300',
        textAlign: 'center',
        marginRight: 56
      },
      tintColor: '#43c2f0'
    })
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: ({ navigation }) => ({
      title: 'Menu',
      headerTintColor: lightCyan,
      headerStyle: {
        backgroundColor: HeaderBackgroundColor
      }
    }),
    header: navigation => ({
      titleStyle: {
        color: '#2C2B50',
        fontFamily: 'MuseoSansRounded-300',
        fontWeight: '300',
        textAlign: 'center',
        marginRight: 56
      },
      tintColor: '#43c2f0'
    })
  },
  Dictionary: {
    screen: Dictionary,
    navigationOptions: ({ navigation }) => ({
      title: 'Dictionary',
      headerTintColor: lightCyan,
      headerStyle: {
        backgroundColor: HeaderBackgroundColor
      }
    }),
    header: navigation => ({
      titleStyle: {
        color: '#2C2B50',
        fontFamily: 'MuseoSansRounded-300',
        fontWeight: '300',
        textAlign: 'center',
        marginRight: 56
      },
      tintColor: '#43c2f0'
    })
  },
  CardOptions: {
    screen: CardOptions,
    navigationOptions: ({ navigation }) => ({
      title: 'Card Info',
      headerTintColor: lightCyan,
      headerStyle: {
        backgroundColor: HeaderBackgroundColor
      },
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DeckView');
          }}
        >
          <Ionicons
            name={'ios-arrow-back'}
            onPress={() => {
              navigation.navigate('DeckView');
            }}
            style={{ fontSize: 30, margin: 5, color: 'blue' }}
          />
        </TouchableOpacity>
      )
    })
  },
  CreateCard: {
    screen: CreateCard,
    navigationOptions: ({ navigation }) => ({
      title: 'Create Quiz',
      headerTintColor: HeaderTextStyle,
      headerStyle: {
        backgroundColor: HeaderBackgroundColor
      }
    })
  },
  startQuiz: {
    screen: CardList,
    navigationOptions: ({ navigation }) => ({
      title: 'Create Quiz',
      headerTintColor: HeaderTextStyle,
      headerStyle: {
        backgroundColor: HeaderBackgroundColor
      }
    })
  }
});

const navigator = createStackNavigator({
  Home: {
    screen: Menu,
    navigationOptions: ({ navigation }) => ({
      title: 'Menu',
      headerTintColor: lightCyan,
      headerStyle: {
        backgroundColor: HeaderBackgroundColor
      }
    }),
    header: navigation => ({
      titleStyle: {
        color: '#2C2B50',
        fontFamily: 'MuseoSansRounded-300',
        fontWeight: '300',
        textAlign: 'center',
        marginRight: 56
      },
      tintColor: '#43c2f0'
    })
  }
});

const bottomNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: MainNavigator,
      navigationOptions: ({ navigation }) => ({
        title: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name={'ios-home-outline'}
            onPress={() => navigation.navigate('Home')}
            style={[styles.iconStyle]}
          />
        )
      })
    },
    CreateADeck: {
      screen: createDeckNavigator,
      navigationOptions: ({ navigation }) => ({
        title: 'Create A Deck',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name={'ios-list-box-outline'} style={[styles.iconStyle]} />
        )
      })
    }
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#e91e63'
    },
    tabBarOptions: {
      style: {
        backgroundColor: '#2C2B50'
      }
    }
  }
);
const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  },
  iconStyle: {
    color: lightCyan,
    fontSize: 30
  }
});

export default bottomNavigator;
