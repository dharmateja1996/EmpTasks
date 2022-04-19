import { closestCorners, DndContext } from "@dnd-kit/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import EmpCardComponent from "../../components/EmpCardComponent";
import {
  KeyboardSensor,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import "./index.css";
import { setActiveId, setEmpData } from "../../redux/actions/taskAction";
import { arrayMove, insertAtIndex, removeAtIndex } from "../../utils";
import TaskCard from "../../components/TaskCard";

const View = () => {
  const employeeData = useSelector((state) => state);

  const dispatch = useDispatch();
  const { empData, activeId } = employeeData.reducer;
  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = ({ active }) => {
    dispatch(setActiveId(active.id));

    console.log("onDragStart...........");
  };
  const handleDragCancel = () => {
    dispatch(setActiveId(null));
    console.log("onDragCancell...........");
  };

 



  const handleDragOver = ({ active, over }) => {
    console.log("onDragOver.......................");
    console.log(active,"active", "=========", over,"over");

    const overId = over?.id;
    
    if(!overId){
      return;
    }




    // here getting the activeContainer nd OverContainer
    const activeEmpId = active.data.current.sortable.containerId;
    const overEmpId = over.data.current?.sortable.containerId || over.id;

    if(!overEmpId){
      return;
    }

    //

    const activeEmp = empData.find(
      (eachEmp) => eachEmp.employeeId === activeEmpId
    );

    //

    const overEmp = empData.find((eachEmp) => eachEmp.employeeId === overEmpId);

    console.log(overEmpId, "=======", overEmpId);
    if (activeEmpId !== overEmpId) {
      // index of what u have picked
      const activeEmpTaskIndex = active.data.current.sortable.index;

      // index of where you what to drop......
      const overEmpTaskIndex = over.data.current.sortable.index;

      //checking the index of where you have picked and where you what to drop
      console.log(activeEmpTaskIndex, "==========", overEmpTaskIndex);

      const updatedEmpData = moveBetweenContainer(
        empData,
        activeEmp,
        activeEmpTaskIndex,
        overEmp,
        overEmpTaskIndex,
        active.id
      );

      console.log(updatedEmpData, "updated---------------");
      dispatch(setEmpData(updatedEmpData));
    }
  };
  const handleDragEnd = ({ active, over }) => {
    console.log("onDragEnd..................");
    console.log(active, "=========", over);

    if (!over) {
      return;
    }

    // if (activeContainer === overContainer) {
    //   const activeIndex = active.data.current.sortable.index
    // }
    if (active.id !== over.id) {
      console.log("====working=====");
      // const activeContainer = active.data.current.sortable.containerId;

      // const overContainer = over.data.current?.sortable.containerId || over.id;

      const activeEmpId = active.data.current.sortable.containerId;
    const overEmpId = over.data.current?.sortable.containerId || over.id;

     // index of what u have picked
     const activeEmpTaskIndex = active.data.current.sortable.index;

     // index of where you what to drop......
     const overEmpTaskIndex = over.data.current?.sortable.index || 0;



      // const activeIndex = active.data.current.sortable.index;
      // const overIndex = over.data.current.sortable.index;

      if (activeEmpId === overEmpId) {
       
        //activeIndex means oldIndex and overIndex means newIndex
        console.log(activeEmpTaskIndex, "==========", overEmpTaskIndex);
        const updatedEmpData = empData.map((eachEmp) => {
          if (eachEmp.employeeId === overEmpId) {
            return {
              ...eachEmp,
              taskList: arrayMove(eachEmp.taskList, activeEmpTaskIndex, overEmpTaskIndex),
            };
          }
          return eachEmp;
        });
        console.log(updatedEmpData, "updated---------------");
        dispatch(setEmpData(updatedEmpData));
      } 
      if(activeEmpId !== overEmpId){
        const updatedEmpData = moveBetweenContainer(
          empData,
          active,
          activeEmpTaskIndex,
          over,
          overEmpTaskIndex,
          active.id
        );
        console.log(updatedEmpData, "updated---------------");
        dispatch(setEmpData(updatedEmpData));
      }
    }
    dispatch(setActiveId(null));
  };

  const moveBetweenContainer = (
    empData,
    activeEmp,
    activeEmpTaskIndex,
    overEmp,
    overEmpTaskIndex,
    activeTaskId
  ) => {
    console.log(
      empData,
      "empData",
      activeEmp,
      "activeEmp",
      activeEmpTaskIndex,
      "activeEmpTaskIndex",
      overEmp,
      "overEmp",
      overEmpTaskIndex,
      "overEmpTaskIndex",
      activeTaskId,
      "taskId"
    );

    const activeItem = activeEmp.taskList.find(
      (eachTask) => eachTask.id === activeTaskId
    );
    console.log(activeItem, "activeItem");
    const presentActiveEmpTaskList = removeAtIndex(
      activeEmp.taskList,
      activeEmpTaskIndex
    );
    console.log(presentActiveEmpTaskList, "presentActiveEmpTaskList");

    const presentOverEmpTaskList = insertAtIndex(
      overEmp.taskList,
      overEmpTaskIndex,
      activeItem
    );
    console.log(presentOverEmpTaskList, "presentOverEmpTaskList");

    const updatedEmpData = empData.map((eachEmp) => {
      if (eachEmp.employeeId === activeEmp.employeeId) {
        return {
          ...eachEmp,
          taskList: presentActiveEmpTaskList,
        };
      }
      if (eachEmp.employeeId === overEmp.employeeId) {
        return {
          ...eachEmp,
          taskList: presentOverEmpTaskList,
        };
      }
      return eachEmp;
    });

    return updatedEmpData;
  };

  return (
    <div className="view-container">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <ul className="employee-container">
          {empData.map((eachEmp, index) => {
            console.log(eachEmp);
            return (
              <EmpCardComponent
                key={index}
                employeeDetails={eachEmp}
                id={eachEmp.employeeId}
                items={eachEmp.taskList}
              />
            );
          })}
        </ul>
        {/* <DragOverlay>
          <div className="drag-overlay">
            <div className="drag-overlay-text">
              <span>Drag and Drop</span>
            </div>  
          </div>
        </DragOverlay> */}
      </DndContext>
    </div>
  );
};

export default View;
