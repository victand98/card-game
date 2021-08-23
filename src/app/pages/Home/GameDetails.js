import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { VscDebugRestart } from "react-icons/vsc";
import { HiInformationCircle } from "react-icons/hi";
import { BiHappyAlt, BiSad } from "react-icons/bi";
import { GiCardPlay } from "react-icons/gi";

import { startGame } from "../../../features/cards/cardsSlice";
import "./GameDetails.css";

export const GameDetails = () => {
  const { wonGames, lostGames, startedPlaying } = useSelector(
    (state) => state.cards
  );

  const dispatch = useDispatch();

  return (
    <div className="game__details">
      <h1 className="title">Juego de Cartas</h1>

      <p className="won-games">
        <BiHappyAlt />
        <span className="won-games-label">Juegos Ganados: </span>
        <span className="won-games-value">{wonGames}</span>
      </p>

      <p className="lost-games">
        <BiSad />
        <span className="lost-games-label">Juegos Perdidos:</span>{" "}
        <span className="lost-games-value">{lostGames}</span>
      </p>

      <p className="indications">
        {startedPlaying ? <GiCardPlay /> : <HiInformationCircle />}
        {startedPlaying
          ? "Jugando..."
          : "Seleccione cualquier grupo de cartas para comenzar el juego"}
      </p>

      <button
        className="restart-game"
        onClick={() => dispatch(startGame())}
        disabled={startedPlaying === false}
      >
        <VscDebugRestart />
        <span>Reiniciar Juego</span>
      </button>
    </div>
  );
};
