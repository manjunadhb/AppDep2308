import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import TopNavigation from "./TopNavigation";
import { useSelector } from "react-redux";

function EditProfile() {
  let nameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let mobileNoInputRef = useRef();
  let profilePicInputRef = useRef();
  let storeObj = useSelector((store) => {
    return store;
  });
  let [profilePicImage, setProfilePicImage] = useState("./images/noImage.png");

  useEffect(() => {
    populateUserDetails();
  }, []);

  let populateUserDetails = () => {
    if (storeObj.loginReducer.userDetails) {
      nameInputRef.current.value = storeObj.loginReducer.userDetails.name;
      ageInputRef.current.value = storeObj.loginReducer.userDetails.age;
      emailInputRef.current.value = storeObj.loginReducer.userDetails.email;
      mobileNoInputRef.current.value =
        storeObj.loginReducer.userDetails.mobileNo;
      setProfilePicImage(
        `http://localhost:4567/${storeObj.loginReducer.userDetails.profilePic}`
      );
    }
  };

  let onUpdateProfile = async () => {
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

    let JSONData = await fetch(
      "http://localhost:4567/updateProfile",
      reqOptions
    );

    let JSOData = await JSONData.json();

    console.log(JSOData);
  };

  let deleteProfile = async () => {
    let reqOptions = {
      method: "DELETE",
    };

    let url = `http://localhost:4567/deleteUser?email=${storeObj.loginReducer.userDetails.email}`;

    let JSONData = await fetch(url, reqOptions);

    let JSOData = await JSONData.json();

    console.log(JSOData);
  };

  return (
    <div className="App">
      <TopNavigation />
      <form>
        <h2>Edit Profile</h2>
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
          <input ref={emailInputRef} readOnly></input>
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
              onUpdateProfile();
            }}
          >
            Update Profile
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              deleteProfile();
            }}
          >
            Delete Profile
          </button>
        </div>
      </form>
      <br></br>
      <Link to="/">Login</Link>
    </div>
  );
}

export default EditProfile;
