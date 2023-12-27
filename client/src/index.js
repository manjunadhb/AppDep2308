import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";

let initialStore = {
  userDetails: {},
};

let loginReducer = (latestStore = initialStore, dispatchedObj) => {
  console.log("inside reducer");
  if (dispatchedObj.type == "login") {
    return { ...latestStore, userDetails: dispatchedObj.data };
  }
  return latestStore;
};

let tasksReducer = (latestStore = initialStore, dispatchedObj) => {
  console.log("inside reducer");
  if (dispatchedObj.type == "addTask") {
    return { ...latestStore };
  }
  return latestStore;
};

let leavesReducer = (latestStore = initialStore, dispatchedObj) => {
  console.log("inside reducer");
  if (dispatchedObj.type == "applyLeave") {
    return { ...latestStore };
  }
  return latestStore;
};

let store = createStore(
  combineReducers({ loginReducer, tasksReducer, leavesReducer }),
  applyMiddleware(thunk)
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
