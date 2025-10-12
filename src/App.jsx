import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Login_page from "./pages/login_page";
import Add_book from "./pages/admin/add_book";
import User_home_page from "./pages/user/user_home_page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Edit_book from "./pages/admin/Edit_book";
import View_book from "./pages/admin/View_book";
import Admin_home from "./pages/admin/Admin_home";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login_page />} />
        <Route path="/admin/home" element={<Admin_home/>} />
        <Route path="/admin/viewbook" element={<View_book/>} />
        <Route path="/user/home" element={<User_home_page />} />
        <Route path="/add-book" element={<Add_book />} />
        <Route path="/edit-book" element={<Edit_book />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={500000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
