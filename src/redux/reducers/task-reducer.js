// import {
//   Create_Employee_Tasks,
//   Add_Emp_Tasks,
//   Employee_Name_Input,
//   Employee_Id_Input,
//   Task_Input,
// } from "../actions/taskActionTypes";

import {
  ADD_TASK_OBJECT,
  REMOVE_TASK,
  HANDLE_TASK_INPUT_CHANGE,
  ISEMPLOYEEOBJECT,
  Employee_Name_Input,
  Employee_Id_Input,
  Create_Employee_Tasks,
  ADD_EMPLOYEE_TASKS,SETACTIVEID, SETEMPDATA
} from "../actions/taskActionTypes";

const initialState = {
  activeId: null,
  isEmployee: "true",
  employeeId: "",
  employeeName: "",
  taskList: [],
  empData: [
    {
      employeeId: "Sb:123W",
      employeeName: "Dharma",
      taskList: [
        { id: "c623cf9b-f916-4d24-b0c0-f0ba2c1679ea", task: "Todo App" },
        { id: "e382cfd5-33c2-461f-a61b-d82c595ae8cb", task: "Cards" },
        { id: "8bc228ec-3fcf-42de-a2c0-f82187d1e00f", task: "Emp App" },
      ],
    },
    {
      employeeId: "sb@shiva123",
      employeeName: "Shiva",
      taskList: [
        { id: "9fbcd4c1-e2e3-4d3f-8aca-ed2e60bf340f", task: "AWS" },
        { id: "4ae81cac-618e-4a21-bd2e-7be3445ff3f9", task: "GCS" },
        { id: "5b3f7489-7d9c-424d-8dc2-a0529885dba8", task: "AZURE" },
      ],
    },
  ],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Create_Employee_Tasks:
      return {
        ...state,
        empData: [...state.empData, payload],
        employeeId:'',
        employeeName:'',
        isEmployee:"true",
        taskList:[]
      };

      case ADD_EMPLOYEE_TASKS:
      return {
        ...state,
        empData: [...payload],
        employeeId:'',
        employeeName:'',
        isEmployee:"true",
        taskList:[]
      };
    // case Add_Emp_Tasks:
    //   return {
    //     ...state,
    //     taskList: [...state.taskList, payload],
    //     task:''
    //   };
    case Employee_Name_Input:
      return {
        ...state,
        employeeName: payload,
      };
    case Employee_Id_Input:
      return {
        ...state,
        employeeId: payload,
      };
    //   case Task_Input:
    //   return {
    //     ...state,
    //     task: payload,
    //   };

    case ADD_TASK_OBJECT:
      return {
        ...state,
        taskList: [...state.taskList, payload],
      };
    case HANDLE_TASK_INPUT_CHANGE:
      return {
        ...state,
      };

    case REMOVE_TASK:
      return {
        ...state,
        taskList: payload,
      };

    case ISEMPLOYEEOBJECT:
      return {
        ...state,
        isEmployee: payload,
      };
    case SETACTIVEID:
      return {
        ...state,
        activeId: payload
      }
      case SETEMPDATA:
        return {
          ...state,
          empData:[...payload]
         
        }  

    default:
      return state;
  }
};

export default reducer;
