import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home_page from "./pages/home_page";
import Login_page from "./pages/login_page";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login_page />} />
        <Route path="/home" element={<Home_page />} />
      </Routes>
    </div>
  );
};

export default App;
