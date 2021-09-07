import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGame } from "../../../features/cards/cardsSlice";
import { CardGroup } from "../../components/CardGroup";
import { GameDetails } from "./GameDetails";

import "./Home.css";

export const Home = () => {
  const cards = useSelector((state) => state.cards);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startGame());
  }, [dispatch]);

  return (
    <div className="home">
      <GameDetails />

      <div className="game__groups">
        {cards.groups.map((group) => (
          <CardGroup {...group} key={group.value} />
        ))}
      </div>
    </div>
  );
};
