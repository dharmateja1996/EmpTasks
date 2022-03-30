import React from "react";

import { Routes, Route } from "react-router-dom";

import "./App.css";

import HeadersComponents from "./components/HeadersComponents";
import Home from "./pages/Home";
import Update from "./pages/Update";
import View from "./pages/View";

function App() {
  return (
    <div className="app-container">
      <HeadersComponents />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view" element={<View />} />
        <Route path="/update" element={<Update/>}/>
  
      </Routes>
    </div>
  );
}

export default App;
