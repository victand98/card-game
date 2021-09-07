import React, { memo } from "react";

import { Card } from "../Card";
import "./CardGroup.css";

export const CardGroup = memo(({ cards, active, value }) => {
  return (
    <div
      className={`card__group group_${value} ${active ? "is-active" : ""}`}
      style={{
        gridArea: `group_${value}`,
      }}
    >
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
      <div className="card__group__value">Grupo: {value}</div>
    </div>
  );
});
