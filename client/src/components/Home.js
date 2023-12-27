import React from "react";
import TopNavigation from "./TopNavigation";
import { useSelector } from "react-redux";

function Home() {
  let storeObj = useSelector((store) => {
    return store;
  });

  console.log(storeObj);
  return (
    <div>
      <TopNavigation />
      <h1>Home</h1>
      <h2>Welcome {storeObj.loginReducer.userDetails.name}</h2>
      <img
        src={`http://localhost:4567/${storeObj.loginReducer.userDetails.profilePic}`}
      ></img>
    </div>
  );
}

export default Home;
