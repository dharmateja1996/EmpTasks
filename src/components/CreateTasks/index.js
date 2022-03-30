import React from "react";

import { useDispatch, useSelector } from "react-redux";
import "./index.css";

import {
  addEmployeeTasks,
  createEmployeeTasks,
  employeeIdInput,
  employeeNameInput,
  isEmployeeObject,
} from "../../redux/actions/taskAction";

import TaskContainerComponent from "../TaskContainerComponent";

const CreateTasks = () => {
  const globalState = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  // const onCreateTask = (event) => {
  //   event.preventDefault();

  //   const newEmployeeData = {
  //     employeeName: globalState.reducer.employeeName,
  //     employeeId: globalState.reducer.employeeId,
  //     taskList: [...globalState.reducer.taskList],
  //   };

  //   dispatch(createEmployeeTasks(newEmployeeData));
  // };

  // const addTask = () => {
  //   const newTask = {
  //     id: uuidv4(),
  //     task: globalState.reducer.task,
  //   };
  //   dispatch(addEmpTasks(newTask));
  // };

  // const handleChange = (event) => {

  //   switch (event.target.name) {
  //     case "Employee_Name_Input":
  //       dispatch(employeeNameInput(event.target.value))
  //       break;
  //     case "Employee_Id_Input":
  //       dispatch(employeeIdInput(event.target.value))
  //       break;

  //     case "Task_Input":
  //       dispatch(taskInput(event.target.value))
  //       break;

  //     default:
  //       break;
  //   }
  //   // setState({
  //   //   ...state,
  //   //   [event.target.name]: event.target.value,
  //   // });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newState = {...globalState}
    if (newState.isEmployee) {
      console.log(newState)
     
      const edittedNewEmpData = newState.empData.map(eachEmpData => {
        if(eachEmpData.employeeId === newState.employeeId){
          return {
            ...eachEmpData,
            taskList:[...newState.taskList,...eachEmpData.taskList]
          }
        }
        return eachEmpData
      })

      dispatch(addEmployeeTasks(edittedNewEmpData))

    } else {
      const newEmployeeData = {
        employeeName: globalState.employeeName,
        employeeId: globalState.employeeId,
        taskList: [...globalState.taskList],
      };

      dispatch(createEmployeeTasks(newEmployeeData));
    }
  };

  const changeHandler = (event) => {
    switch (event.target.name) {
      case "Employee_Name_Input":
        dispatch(employeeNameInput(event.target.value));
        break;
      case "Employee_Id_Input":
        dispatch(employeeIdInput(event.target.value));
        break;

      default:
        break;
    }
  };

  const blurHandler = () => {
    const isEmployee = globalState.empData.some(
      (eachEmp, index) =>
        eachEmp.employeeId.toLowerCase() ===
        globalState.employeeId.toLowerCase()
    );
    console.log(isEmployee);
    dispatch(isEmployeeObject(isEmployee));
  };

  return (
    <div className="create-container">
      <h1>Create Task</h1>

      <form className="form-container" onSubmit={handleSubmit}>
        <div className="sub-container">
          <label className="label">Employee Id:</label>
          <input
            name="Employee_Id_Input"
            className="input-type"
            type="text"
            value={globalState.employeeId}
            onChange={changeHandler}
            onBlur={blurHandler}
          />
        </div>
        {globalState.isEmployee ? (
          <>
            <TaskContainerComponent />
            <button type="submit" className="button create-button">
              Add More
            </button>
          </>
        ) : (
          <>
            <div className="sub-container">
              <label className="label">Employee Name:</label>
              <input
                name="Employee_Name_Input"
                className="input-type"
                type="text"
                value={globalState.employeeName}
                onChange={changeHandler}
              />
            </div>
            <TaskContainerComponent />
            <button type="submit" className="button create-button">
              Create
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default CreateTasks;
