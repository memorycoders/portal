import React, { useState } from "react";
import LoginForm from "./Form";
import { Card, message } from "antd";
import logoImage from "../../assets/23rdc.svg";
import Progress from "src/components/Progress"

const PageLogin = (props) => {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const changeLoginStatus = (value) => {
    setLoginSuccess(true)
  }
  if (!loginSuccess) {
    return (
      <div className="login-page">
        <img className="logo-image" src={logoImage}/>
        <LoginForm loginStatus={(value) => changeLoginStatus(value)} />
      </div>
    );
  }
  return (
    <div className="login-page">
      <div className="loading-component">
        <img src={logoImage}/>
        <Progress />
      </div>
    </div>
  );
};

export default PageLogin;
