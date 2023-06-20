import React, { useContext, useState } from "react";
import "./home.scss";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogOut = async () => {
    signOut(auth);
  };

  const [profileWindow, setProfileWindow] = useState(false);

  return (
    <div className="navbar">
      <span>Note-App</span>

      <AccountCircleIcon onClick={()=>{setProfileWindow(!profileWindow)}} />
      {profileWindow && (
        <div className="profile">
          <div className="profileContainer">

          {user.photoURL ? <img src={user.photoURL} alt="" />: <AccountCircleIcon />}
          <span>{user.email}</span>
          <div className="logout" onClick={handleLogOut}>

          <i >
            <LogoutIcon />
          </i>
          <span>Log out</span>
          </div>
          </div>
          <button onClick={()=>{setProfileWindow(!profileWindow)}}>X</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
