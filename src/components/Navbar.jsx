import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify/unstyled";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, backendurl } = useContext(AppContext);
  const loggedout=()=> toast("Logged out successfuly")

  const logoutfunction = async () => {
    const data = await axios.post(backendurl + "/api/auth/logout");
    if (data.success) {
      setIsLoggedIn(false);
      loggedout()
    }
  };
  return (
    <div className="bg-blue-400 h-10 w-auto flex justify-between p-4">
      <h1>library</h1>

      <ul className="flex justify-between pl-5 gap-3">
        <li>
          <a href="/admin/home">home</a>
        </li>
        <li>
          <a href="/add-book">add book</a>
        </li>
        <li>
          <a href="/" onClick={logoutfunction}>
            logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
