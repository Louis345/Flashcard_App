import { AsyncStorage } from 'react-native';

const api = {
  async getDeck(key) {
    try {
      const cards = AsyncStorage.getItem(key);

      return cards;
    } catch (error) {
      // Error saving data
      return error;
    }
  },
  async saveDeckTitle(title, callback) {
    let item = {
      [title]: {
        title: title
      },
      question: []
    };

    try {
      await AsyncStorage.setItem(title, JSON.stringify(item), callback(true));
    } catch (error) {
      // Error saving data
      callback(error);
      return error;
    }
  },
  getDecks() {
    return AsyncStorage.getAllKeys();
  },
  checkSavedTitles(title, callback) {
    let listPromise = AsyncStorage.getAllKeys();
    let status = null;
    listPromise.then(list => {
      status = list.findIndex(key => key === title);
      callback(status);
    });
  },
  removeNotificationSync(list) {
    let removedNotification = list.filter((items, idx) => {
      return items !== 'flash_cards';
    });
    return removedNotification;
  },
  getDeckSize(callback) {
    let cardSize = [];
    AsyncStorage.getAllKeys((err, keys) => {
      //remove first key
      let filteredKeys = this.removeNotificationSync(keys);

      AsyncStorage.multiGet(filteredKeys, (err, stores) => {
        stores.map((result, i, store) => {
          // get at each store's key/value so you can work with it

          let key = store[i][0];
          let value = store[i][1];

          let parsedCard = JSON.parse(value);

          cardSize.push(parsedCard.question.length);
          callback(cardSize);
        });
      });
    });
  },
  deleteAllDecks() {
    AsyncStorage.clear();
  },
  removeDeck(title, callback) {
    try {
      AsyncStorage.removeItem(title, () => {
        callback();
      });
    } catch (error) {
      // Error saving data
      return error;
    }
  },
  removeItem(title, callback) {
    console.log(title);
    try {
      AsyncStorage.removeItem(title);
    } catch (error) {
      console.log(error);
      // Error saving data
      return error;
    }
  },
  async addCardToDeck(key, cardInfo, callback) {
    let card = AsyncStorage.getItem(key);
    card.then(info => {
      const restoredCard = JSON.parse(info);
      restoredCard.question.push(cardInfo);
      AsyncStorage.setItem(key, JSON.stringify(restoredCard));
      callback && callback();
    });
  }
};
export default api;
