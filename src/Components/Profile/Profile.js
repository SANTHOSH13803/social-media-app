import React from "react";
import "./index.css";
import { auth } from "../Firebase";
import Navbar from "../Navbar/Navbar";
const Profile = () => {
  const user = auth.currentUser;
  // console.log(user);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex justify-content-center mt-5">
            <div className="user-profile-logo">
              <p>{user.displayName[0]}</p>
            </div>
          </div>
          <div className="col-12">
            <p className="profile-details">
              <span>UserName</span> : {user.displayName}
            </p>
          </div>
          <div className="col-12">
            <p className="profile-details">
              <span>Email</span> : {user.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
