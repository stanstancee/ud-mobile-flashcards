import {
    RECEIVE_DECKS,
    ADD_DECK,
    ADD_CARD
} from '../actions/actionTypes';


export default function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            };

        case ADD_DECK:
            const { title } = action;
            return {
                ...state,
                [title]: {
                    title,
                    questions: []
                }
            };

        case ADD_CARD:
            const { deckId, card } = action;
            return {
                ...state,
                [deckId]: {
                    ...state[deckId],
                    questions: [...state[deckId].questions].concat(card)
                }
            };


        default:
            return state;
    }
}