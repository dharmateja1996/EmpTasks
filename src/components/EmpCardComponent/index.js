import React from 'react'
import TaskCard from '../TaskCard'

import './index.css'

const EmpCardComponent = (props) => {
    const {employeeDetails} = props

    
    
  return (
    <li className='emp-card-list-item-container'>
        <h1 className='emp-name'>{employeeDetails.employeeName}</h1>
        <ul className='task-list-container'>
            {employeeDetails.taskList.map((eachTask,index) => <TaskCard key={index} taskDetails={eachTask}/>)}
        </ul>
    </li>
  )
}

export default EmpCardComponent
