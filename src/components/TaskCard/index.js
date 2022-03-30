import React from "react";
import "./index.css";

const TaskCard = (props) => {
  const radomNumber = Math.floor(Math.random() * 11);
  const CardColors = [
    "color-red",
    "color-green",
    "color-blue",
    "color-pink",
    "color-gray",
    "color-black",
    "color-radomone",
    "color-radomtwo",
    "color-radomthree",
    "color-radomfour",
    "color-radomfive",
    "color-radomsix",
  ];
  const radomColor = CardColors[radomNumber];

  return (
    <li className={`task-list-item ${radomColor}`}>{props.taskDetails.task}</li>
  );
};

export default TaskCard;
