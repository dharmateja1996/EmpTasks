import React from "react";
import TaskCard from "../TaskCard";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import "./index.css";

const EmpCardComponent = ({ employeeDetails, id }) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });



  return (
    <SortableContext id={id} items={employeeDetails.taskList.map(task => task.id)} strategy={rectSortingStrategy}>
      <li className="emp-card-list-item-container" ref={setNodeRef}>
        <h1 className="emp-name">{employeeDetails.employeeName}</h1>
        <ul className="task-list-container">
          {employeeDetails.taskList.map((eachTask, index) => (
            <TaskCard key={index} taskDetails={eachTask} id = {eachTask.id} />
          ))}
        </ul>
      </li>
    </SortableContext>
  );
};

export default EmpCardComponent;
