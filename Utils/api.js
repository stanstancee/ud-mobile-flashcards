import { decks } from './_DATA'
import AsyncStorage from '@react-native-async-storage/async-storage';
const STORAGE_KEY = "@stan:flashcards"



export const _getDecks = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY)
      if(value !== null) {
        return JSON.parse(value)

      }
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
      return decks

    } catch(e) {

      console.log(e)
    }
  }

  export async function _getDeck(id) {
    try {
      const deck = await AsyncStorage.getItem(STORAGE_KEY);

      return JSON.parse(deck)[id];
    } catch (e) {
      console.log(e);
    }
  }

  export async function _saveDeckTitle(title) {
    try {
      await AsyncStorage.mergeItem(
        STORAGE_KEY,
        JSON.stringify({
          [title]: {
            title,
            questions: []
          }
        })
      );
    } catch (e) {
      console.log(e);
    }
  }

  export async function _addCardToDeck(title, card) {
    try {
      const deck = await _getDeck(title);

      await AsyncStorage.mergeItem(
        STORAGE_KEY,
        JSON.stringify({
          [title]: {
            questions: [...deck.questions].concat(card)
          }
        })
      );
    } catch (e) {
      console.log(e);
    }
  }

