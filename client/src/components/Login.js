import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    console.log("Login.js UE");
    //axios.defaults.baseURL = "http://localhost:4567";
    //if (localStorage.getItem("token")) {
    //axios.defaults.headers.common["Authorization"] =
    //localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");
    //}

    validateLoginThruTok();
  }, []);

  let validateLoginThruTok = async () => {
    if (localStorage.getItem("token")) {
      let dataToSend = new FormData();
      dataToSend.append("token", localStorage.getItem("token"));

      let response = await axios.post("/validateLoginThruToken", dataToSend);

      console.log(response);

      if (response.data.status == "success") {
        dispatch({ type: "login", data: response.data.data });
        navigate("/home");
      } else {
        alert(response.data.msg);
      }
    }
  };

  let validateLoginUsingAxios = async () => {
    dispatch(vc());
  };

  let vc = () => {
    return async () => {
      let dataToSend = new FormData();
      dataToSend.append("email", emailInputRef.current.value);
      dataToSend.append("password", passwordInputRef.current.value);

      let response = await axios.post("/validateLogin", dataToSend);

      console.log(response);

      if (response.data.status == "success") {
        localStorage.setItem("token", response.data.token);
        dispatch({ type: "login", data: response.data.data });
        navigate("/home");
      } else {
        alert(response.data.msg);
      }

      console.log(response.data);
    };
  };

  return (
    <div className="App">
      <form>
        <h2>Login</h2>
        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef} type="password"></input>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              //validateLogin();
              validateLoginUsingAxios();
            }}
          >
            Login
          </button>
        </div>
      </form>
      <br></br>
      <Link to="/signup">Signup</Link>
    </div>
  );
}

export default Login;
