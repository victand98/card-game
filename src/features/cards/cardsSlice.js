import { createSlice } from "@reduxjs/toolkit";
import { SUITS, VALUES } from "../../helpers/constants";
import {
  chunkify,
  dangerToast,
  shuffle,
  successToast,
} from "../../helpers/utils";

const initialState = {
  status: false,
  startedPlaying: false,
  groups: [],
  wonGames: 0,
  lostGames: 0,
  turnedOverCards: 0,
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    splitCards: (state, action) => {
      state.groups = action.payload;
      state.status = true;
      state.startedPlaying = false;
      state.turnedOverCards = 0;
    },
    activeGroup: (state, action) => {
      state.startedPlaying = true;
      state.groups[action.payload].active = true;
    },
    flip: (state, action) => {
      state.groups[action.payload.groupIndex].cards[
        action.payload.cardIndex
      ].isFlipped = true;
      state.turnedOverCards++;
    },
    toggleActiveGroup: (state, action) => {
      state.groups[action.payload.currentGroupIndex].active = false;
      state.groups[action.payload.newGroupIndex].active = true;
      state.groups[action.payload.newGroupIndex].cards.unshift(
        state.groups[action.payload.currentGroupIndex].cards.pop()
      );
    },
    wonGame: (state, action) => {
      state.wonGames++;
      state.status = false;
    },
    lostGame: (state, action) => {
      state.lostGames++;
      state.status = false;
    },
  },
});

export const startGame = () => (dispatch, getState) => {
  let deck = freshDeck();
  deck = shuffle(deck);
  deck = chunkify(deck, 13);

  const group = deck.map((item, index) => ({
    active: false,
    cards: item,
    value: VALUES[index],
  }));

  dispatch(splitCards(group));
};

const freshDeck = () => {
  return SUITS.flatMap((suit) => {
    return VALUES.map((value) => {
      return { suit, value, isFlipped: false };
    });
  });
};

export const startToPlay = (groupValue) => (dispatch, getState) => {
  const groupIndex = getState().cards.groups.findIndex(
    (group) => group.value === groupValue
  );
  dispatch(activeGroup(groupIndex));
};

export const moveCard = (cartVatue, groupValue) => (dispatch, getState) => {
  const currentGroupIndex = getState().cards.groups.findIndex(
    (group) => group.value === groupValue
  );
  const newGroupIndex = getState().cards.groups.findIndex(
    (group) => group.value === cartVatue
  );

  dispatch(toggleActiveGroup({ currentGroupIndex, newGroupIndex }));
};

export const flipCard =
  (cardIndex, groupValue, cardValue) => (dispatch, getState) => {
    const groupIndex = getState().cards.groups.findIndex(
      (group) => group.value === groupValue
    );
    dispatch(flip({ cardIndex, groupIndex }));

    let nextGroup = [];
    if (groupValue === cardValue) {
      nextGroup = getState().cards.groups[groupIndex];
    } else {
      nextGroup = getState().cards.groups.find(
        (group) => group.value === cardValue
      );
    }

    const nextGroupflippedCards = nextGroup.cards.filter(
      (card) => card.isFlipped
    );

    if (nextGroup.cards.length === nextGroupflippedCards.length) {
      if (getState().cards.turnedOverCards < 52) {
        dangerToast("Has Perdido, vuelve a intentarlo.");
        dispatch(moveCard(cardValue, groupValue));
        dispatch(lostGame());
      } else {
        successToast("Felicidades, has ganado.");
        dispatch(wonGame());
      }
    }
  };

export const {
  splitCards,
  activeGroup,
  toggleActiveGroup,
  flip,
  wonGame,
  lostGame,
} = cardsSlice.actions;

export default cardsSlice.reducer;
