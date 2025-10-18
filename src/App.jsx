import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login_page from "./pages/login_page";
import Add_book from "./pages/admin/add_book";
import User_home_page from "./pages/user/user_home_page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Edit_book from "./pages/admin/Edit_book";
import View_book from "./pages/admin/View_book";
import Admin_home from "./pages/admin/Admin_home";
import { AppContext } from "./context/AppContext";

const App = () => {
  const { isLoggedIn, userData } = useContext(AppContext);

  // Protected Route Component
  const ProtectedRoute = ({ children, requireAuth = true }) => {
    if (requireAuth && !isLoggedIn) {
      return <Navigate to="/" replace />;
    }
    if (!requireAuth && isLoggedIn) {
      if (userData?.role === 'admin') {
        return <Navigate to="/admin/home" replace />;
      }
      return <Navigate to="/user/home" replace />;
    }
    return children;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute requireAuth={false}>
              <Login_page />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/home"
          element={
            <ProtectedRoute>
              <Admin_home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/viewbook"
          element={
            <ProtectedRoute>
              <View_book />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/home"
          element={
            <ProtectedRoute>
              <User_home_page />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-book"
          element={
            <ProtectedRoute>
              <Add_book />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-book"
          element={
            <ProtectedRoute>
              <Edit_book />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-16"
      />
    </div>
  );
};

export default App;
