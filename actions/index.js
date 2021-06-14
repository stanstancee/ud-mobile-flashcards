import {_getDecks} from '../Utils/api'
import {RECEIVE_DECKS,REMOVE_DECK,ADD_CARD,ADD_DECK} from './actionTypes'

export const receiveDecks = (decks) => {
    return {
      type: RECEIVE_DECKS,
      decks
    };
  }

  export const  removeDeck = (id) =>{
    return {
      type: REMOVE_DECK,
      id
    };
  }

  export const addDeck = (title) => {
    return {
      type: ADD_DECK,
      title
    };
  }



  export const addCardToDeck = (deckId, card) =>{
    return {
      type: ADD_CARD,
      deckId,
      card
    };
  }

  export function handleInitialData() {
    return dispatch => {
      return _getDecks()
      .then(decks => {
        dispatch(receiveDecks(decks));
      });
    };
  }