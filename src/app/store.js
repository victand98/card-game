import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import cardsReducer from "../features/cards/cardsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cards: cardsReducer,
  },
});
