import React, { memo } from "react";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { scroller } from "react-scroll";

import {
  startToPlay,
  moveCard,
  flipCard,
} from "../../../features/cards/cardsSlice";
import "./Card.css";

export const Card = memo(
  ({ suit, value, isFlipped, active, cardIndex, groupValue, canFlip }) => {
    const { startedPlaying } = useSelector((state) => state.cards);
    const dispatch = useDispatch();

    const onClickCardFront = () => {
      if (startedPlaying === false && canFlip) {
        dispatch(startToPlay(groupValue));
        dispatch(flipCard(cardIndex, groupValue, value));
      }
      if (active && canFlip) {
        dispatch(flipCard(cardIndex, groupValue, value));
      }
    };

    const onClickCardBack = () => {
      if (active && canFlip) {
        dispatch(moveCard(value, groupValue));
        scroller.scrollTo(`group_${value}`, {
          duration: 400,
          delay: 0,
          smooth: "easeInOutQuart",
          offset: -100,
        });
      }
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

          <div
            className="card__face card__face--back"
            onClick={onClickCardBack}
          >
            <div className="card__content">
              <div
                className={`suit suit-top suit-${
                  suit === "♣" || suit === "♠" ? "black" : "red"
                }`}
              >
                <span>{value}</span>
                {suit}
              </div>
              <div className="value">{value}</div>
              <div
                className={`suit suit-bottom suit-${
                  suit === "♣" || suit === "♠" ? "black" : "red"
                }`}
              >
                <span>{value}</span>
                {suit}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
