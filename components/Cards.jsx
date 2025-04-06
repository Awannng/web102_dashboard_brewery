import React from "react";

const Cards = ({ title, count }) => {
  return (
    <div className="card-content">
      <h3>{title}</h3>
      <p>{count}</p>
    </div>
  );
};

export default Cards;
