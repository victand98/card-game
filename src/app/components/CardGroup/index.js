import React, { memo } from "react";

import { Card } from "../Card";
import "./CardGroup.css";

export const CardGroup = memo(({ cards, active, value }) => {
  return (
    <div className={`card__group ${active ? "is-active" : ""}`}>
      <div className="card__group__cards">
        {cards.map((card, index) => (
          <Card
            {...card}
            key={index}
            active={active}
            groupValue={value}
            cardIndex={index}
            canFlip={index === cards.length - 1}
          />
        ))}
      </div>
      <div className="card__group__value">Grupo de: {value}</div>
    </div>
  );
});
