import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Tasks from "./components/Tasks";
import Leaves from "./components/Leaves";
import EditProfile from "./components/EditProfile";
import { useEffect } from "react";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/tasks" element={<Tasks />}></Route>
        <Route path="/leaves" element={<Leaves />}></Route>
        <Route path="/editProfile" element={<EditProfile />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
