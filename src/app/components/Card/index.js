import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { startToPlay, moveCard } from "../../../features/cards/cardsSlice";
import "./Card.css";

export const Card = ({ suit, value, active, groupValue }) => {
  const { startedPlaying } = useSelector((state) => state.cards);
  const [isFlipped, setIsFlipped] = useState(false);
  const dispatch = useDispatch();

  const onClickCardFront = () => {
    if (startedPlaying === false) {
      dispatch(startToPlay(groupValue));
      setIsFlipped(true);
    }
    if (active) {
      setIsFlipped(true);
    }
  };

  const onClickCardBack = () => {
    if (active) dispatch(moveCard(value, groupValue));
  };

  return (
    <div className="card">
      <div className={`card__inner ${isFlipped ? "is-flipped" : ""}`}>
        <div
          className="card__face card__face--front"
          onClick={onClickCardFront}
        >
          <AiFillStar />
        </div>

        <div className="card__face card__face--back" onClick={onClickCardBack}>
          <div className="card__content">
            <div
              className={`suit-top suit-${
                suit === "♣" || suit === "♠" ? "black" : "red"
              }`}
            >
              {suit}
            </div>
            <div className="value">{value}</div>
            <div
              className={`suit-bottom suit-${
                suit === "♣" || suit === "♠" ? "black" : "red"
              }`}
            >
              {suit}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
