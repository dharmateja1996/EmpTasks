import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import "./index.css";

const TaskCard = ({ taskDetails, id }) => {
  const {
    isDragging,
    attributes,
    transform,
    transition,
    listeners,
    setNodeRef,
  } = useSortable({
    id: id,
  });
  // const radomNumber = Math.floor(Math.random() * 11);
  // const CardColors = [
  //   "color-red",
  //   "color-green",
  //   "color-blue",
  //   "color-pink",
  //   "color-gray",
  //   "color-black",
  //   "color-radomone",
  //   "color-radomtwo",
  //   "color-radomthree",
  //   "color-radomfour",
  //   "color-radomfive",
  //   "color-radomsix",
  // ];
  // const radomColor = CardColors[radomNumber];
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    cursor: isDragging ? "grabbing" : "grab",
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="task-list-item  color-green"
    >
      {taskDetails.task}
    </li>
  );
};

export default TaskCard;
