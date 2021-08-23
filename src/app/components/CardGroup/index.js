import React from "react";

import { Card } from "../Card";
import "./CardGroup.css";

export const CardGroup = ({ cards, active, value }) => {
  return (
    <div className={`card__group ${active ? "is-active" : ""}`}>
      <div className="card__group__cards">
        {cards.map((card, index) => (
          <Card {...card} key={index} active={active} groupValue={value} />
        ))}
      </div>
      <div className="card__group__value">Grupo de: {value}</div>
    </div>
  );
};
