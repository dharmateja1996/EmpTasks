import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HeadersComponents = () => {
  const globalState = useSelector((state) => state.reducer);
  
  const saveToLocalStorage = () => {
    console.log('Save Button is Clicked');
    console.log(globalState.empData);
    console.log(JSON.stringify(globalState.empData))

  }

  return (
    <div className="headers-container">
      <div className="logo">
        <h1 className="logo-heading">Logo</h1>
      </div>
      <div className="navigation-container">
        <p>
          <Link className="link-container" to="/">Home</Link>
        </p>
        <p>
          <Link className="link-container" to="/view">View</Link>
        </p>
        <div className="save-button-container">
          <button onClick={saveToLocalStorage} className="save-button">Save</button>
        </div>
      </div>
    </div>
  );
};

export default HeadersComponents;
