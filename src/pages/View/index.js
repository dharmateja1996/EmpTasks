import React from 'react'
import { useSelector } from 'react-redux'
import EmpCardComponent from '../../components/EmpCardComponent'

import './index.css'

const View = () => {

    const employeeData = useSelector(state => state)
    const {empData} = employeeData.reducer
    console.log(empData)
    
  return (
    <div className='view-container'>
    
        <ul className='employee-container'>
            {empData.map((eachEmp,index) => <EmpCardComponent key={index} employeeDetails={eachEmp}/>)}
        </ul>
      
    </div>
  )
}

export default View
