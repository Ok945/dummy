/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from "react";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Login from "./components/Login";







function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
