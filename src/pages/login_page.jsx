import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login_page = () => {
  const navigate = useNavigate();
  const { backendurl, setIsLoggedIn ,setuserData} = useContext(AppContext);
  console.log(backendurl);

  const [state, setState] = useState("sign up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
 const [loading, setLoading] = useState(false);

  const successlogin=()=> toast("Logged in successfuly")

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      
    setLoading(true);
    const formData = new FormData(); // ← Key: Use FormData for multipart
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("file", file);
    formData.append("role", "user");
      if (state === "sign up") {
        const { registerData } = await axios.post(backendurl + "/api/auth/register",formData);
      } else {
        const { logindata } = await axios.post(backendurl + "/api/auth/login", {
          email,
          password,
        });
        console.log(logindata);
        const { success,user } = logindata;
        
        if (success === true ) {
          setuserData(user)
        if( user.role==="admin"){
          setIsLoggedIn(true);
          navigate("/admin/home", { replace: true });
          successlogin()
        }
        else{
           navigate("/user/home", { replace: true });
           successlogin()
        }
      }
      }
    } catch (error) {
      console.log("error:" + error);
    }
  };

 const handleFileChange = (e) => {
   setFile(e.target.files[0]);
 };


  return (
    <div className=" min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-300 to-blue-600">
      <h2 className="text-2xl">{state === "sign up" ? "Register" : "Login"}</h2>

      <form
        className="bg-blue-400 border-1 rounded-xl flex flex-col flex-wrap m-4 p-4"
        onSubmit={submitHandler}
      >
         {state === "sign up" && (
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="bg-blue-300 mb-3 p-2 rounded-2xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-700 file:text-white hover:file:bg-blue-800"
        />)}
        {state === "sign up" && (
          <input
            className="bg-blue-300 rounded-2xl p-2  mb-3 text-black"
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Full Name"
            required
          />
        )}
        {state === "sign up" && (
          <input
            className="bg-blue-300 rounded-2xl p-2  mb-3 text-black"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            type="number"
            placeholder="Phone Number"
            required
          />
        )}

        <input
          className="bg-blue-300 rounded-2xl p-2  mb-3 text-black"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="E mail"
          required
        />

        <input
          className="bg-blue-300 rounded-2xl p-2  mb-3 text-black"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          required
        />
        <br />
        <button className="bg-blue-300 rounded-2xl p-2">{state}</button>
        <br />
        {state === "sign up" ? (
          <p>
            already have an account?{" "}
            <span
              className="text-blue-800 underline"
              onClick={() => setState("Login")}
            >
              login
            </span>
          </p>
        ) : (
          <p>
            Dont have an account?{" "}
            <span
              className="text-blue-800 underline"
              onClick={() => setState("sign up")}
            >
              register
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login_page;
