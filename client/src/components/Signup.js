import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  let nameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let mobileNoInputRef = useRef();
  let profilePicInputRef = useRef();
  let [profilePicImage, setProfilePicImage] = useState("./images/noImage.png");

  let onSignup = async () => {
    let dataToSend = {
      name: nameInputRef.current.value,
      age: ageInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      mobileNo: mobileNoInputRef.current.value,
      profilePic: profilePicInputRef.current.value,
    };

    let dataToSendJSON = JSON.stringify(dataToSend);

    console.log(dataToSend);

    let myHeader = new Headers();
    myHeader.append("content-type", "application/json");

    let reqOptions = {
      method: "POST",
      body: dataToSendJSON,
      headers: myHeader,
    };

    let JSONData = await fetch("/signup", reqOptions);

    let JSOData = await JSONData.json();

    console.log(JSOData);
  };

  let onSignupURLE = async () => {
    let dataToSend = new URLSearchParams();
    dataToSend.append("name", nameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("mobileNo", mobileNoInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("profilePic", profilePicInputRef.current.value);

    let myHeader = new Headers();
    myHeader.append("content-type", "application/x-www-form-urlencoded");

    let reqOptions = {
      method: "POST",
      body: dataToSend,
      headers: myHeader,
    };

    let JSONData = await fetch("/signup", reqOptions);

    let JSOData = await JSONData.json();

    console.log(JSOData);
  };

  let onSignupFormData = async () => {
    let dataToSend = new FormData();
    dataToSend.append("name", nameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("mobileNo", mobileNoInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);

    for (let i = 0; i < profilePicInputRef.current.files.length; i++) {
      dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
    }

    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };

    let JSONData = await fetch("/signup", reqOptions);

    let JSOData = await JSONData.json();

    console.log(JSOData);
  };

  return (
    <div className="App">
      <form>
        <h2>Signup</h2>
        <div>
          <label>Name</label>
          <input ref={nameInputRef}></input>
        </div>
        <div>
          <label>Age</label>
          <input ref={ageInputRef}></input>
        </div>
        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
        <div>
          <label>Mobile No.</label>
          <input ref={mobileNoInputRef}></input>
        </div>
        <div>
          <label>Profile Pic</label>
          <input
            ref={profilePicInputRef}
            multiple
            type="file"
            onChange={() => {
              let selectedImageURL = URL.createObjectURL(
                profilePicInputRef.current.files[0]
              );

              setProfilePicImage(selectedImageURL);
            }}
          ></input>
        </div>
        <div>
          <img src={profilePicImage} className="profilePic"></img>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              onSignup();
            }}
          >
            Sign Up
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              onSignupURLE();
            }}
          >
            Sign Up(URLE)
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              onSignupFormData();
            }}
          >
            Sign Up(FormData)
          </button>
        </div>
      </form>
      <br></br>
      <Link to="/">Login</Link>
    </div>
  );
}

export default Signup;
