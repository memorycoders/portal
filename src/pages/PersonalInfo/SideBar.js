import * as React from "react";
import logoImage from "src/assets/logo.svg";
import Avatar from "@mui/material/Avatar";
import AvatarImage from "src/assets/avatar.png";
import { useHistory } from "react-router";
const SideBar = () => {
  const history = useHistory();
  const labelName = localStorage.getItem('labelName') || '';
  const handleLogOut = () => {
    history.push('/login');
    localStorage.clear();
  }
  return (
    <div className="userinfo">
      <div className="userinfo-header">
        <img className="userinfo-logo-image" src={logoImage} />
      </div>
      <div className="userinfo-contain-avatar">
        <Avatar
          className="userinfo-avatar"
          sx={{ width: 44, height: 44 }}
          src={AvatarImage}
        />
        <div className="userinfo-name">{labelName}</div>
      </div>
      <div className="userinfo-contain-profile">
        <button className="userinfo-profile-details">Profile details</button>
        <button className="userinfo-noti-conn">Notifications</button>
        <button className="userinfo-noti-conn">Connect Dropbox</button>
        <button onClick={handleLogOut} className="userinfo-logout">Log Out</button>
      </div>
    </div>
  );
};
export default SideBar;
