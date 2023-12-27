import React from "react";
import TopNavigation from "./TopNavigation";
import { useDispatch } from "react-redux";

function Leaves() {
  let dispatch = useDispatch();
  return (
    <div>
      <TopNavigation />
      <h1>Leaves</h1>
      <button
        onClick={() => {
          dispatch({ type: "applyLeave", data: "Not Feeling well" });
        }}
      >
        Apply Leave
      </button>
    </div>
  );
}

export default Leaves;
