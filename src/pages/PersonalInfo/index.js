import * as React from "react";
import Info from "./Info";
import SideBar from "./SideBar";
import { useHistory } from 'react-router';
const PersonalInfo = () => {
  const history = useHistory();
  return (
    <div className="userinfo-page">
      <button className="btn-close" onClick={()=>history.goBack()}>Close,thanks</button>
      <SideBar />
      <Info></Info>
    </div>
  );
};

export default PersonalInfo;
