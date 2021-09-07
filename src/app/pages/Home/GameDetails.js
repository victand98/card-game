import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { VscDebugRestart } from "react-icons/vsc";
import { HiInformationCircle } from "react-icons/hi";
import { BiSad } from "react-icons/bi";
import { GiCardPlay, GiCardExchange, GiFinishLine } from "react-icons/gi";
import { AiTwotoneTrophy } from "react-icons/ai";

import { startGame } from "../../../features/cards/cardsSlice";
import "./GameDetails.css";

export const GameDetails = () => {
  const { wonGames, lostGames, startedPlaying, turnedOverCards, status } =
    useSelector((state) => state.cards);

  const dispatch = useDispatch();

  return (
    <div className="game__details">
      <h1 className="title">Juego de Cartas</h1>

      <div className="statistics">
        <p className="won-games">
          <AiTwotoneTrophy />
          <span className="won-games-label">Juegos Ganados: </span>
          <span className="won-games-value">{wonGames}</span>
        </p>

        <p className="lost-games">
          <BiSad />
          <span className="lost-games-label">Juegos Perdidos:</span>{" "}
          <span className="lost-games-value">{lostGames}</span>
        </p>

        <p className="turned-over-cards">
          <GiCardExchange />
          <span className="turned-over-cards-label">Cartas Jugadas:</span>{" "}
          <span className="turned-over-cards-value">
            <strong>{turnedOverCards}</strong> de 52
          </span>
        </p>
      </div>
      <p className="indications">
        {startedPlaying ? (
          status ? (
            <GiCardPlay />
          ) : (
            <GiFinishLine />
          )
        ) : (
          <HiInformationCircle />
        )}
        {startedPlaying
          ? status
            ? "Jugando..."
            : `El juego ha terminado.${
                52 - turnedOverCards === 0
                  ? " Has volteado todas las cartas"
                  : ` Te faltaron ${52 - turnedOverCards} cartas para ganar.`
              }`
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
