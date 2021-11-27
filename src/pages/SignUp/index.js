import React, { useState, useEffect } from "react";
import logoImage from "../../assets/23rdc.svg";
import { Snackbar } from "@mui/material";
import TermsConditions from "./TermsConditions";
import SignUpForm from "./Form";
import SignUpForm2 from "./Form2";
import WaitMess from "./WaitMess";
import Progress from "src/components/Progress";
import { apiSignUp, apiListTimezone } from "src/apis/callApi";
import { useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const PageSignUp = (props) => {
  const query = useQuery();
  const [timezoneData, setTimezoneData] = useState("");
  const invite_token = query.get("data");
  if (invite_token != null && invite_token != '') {
    var decoded = jwt_decode(invite_token) || '';
    var header = { invite_data: invite_token }
  } else {
    var decoded = '';
    var header = {}
  }
  const [step, setStep] = useState(1);
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    firstName: "",
    lastName: "",
    avatar: "",
    code: "",
    timezone:{}
  })
  const [noti, setNoti] = useState({ open: false, content: '' });

  useEffect(() => {
    apiListTimezone().then(res => {
      const date = new Date();
      const offset = date.getTimezoneOffset();
      const timezonelist = res?.data?.filter((item) => item.value === -offset/60);
      setTimezoneData(timezonelist)
    })
  }, []);

  useEffect(() => {
    setSignUpData({...signUpData,timezone:timezoneData[0]})
  }, [timezoneData])

  const changeSignUpInfo = (value) => {
    setSignUpData({ ...signUpData, ...value })
    setStep(step + 1)
  }
  const handleClose = () => {
    setNoti({ ...noti, open: false })
  }
  useEffect(() => {
    console.log(signUpData)
    if (step === 4) {
      apiSignUp({ ...header }, signUpData).then(res => {
        if (res.status === '00') {
          if (Object.keys(header).length === 0) {
            setNoti({ open: true, content: 'Please activate your account' })
          } else {
            setStep(5)
            localStorage.setItem('access_token', res.data.accessToken);
            localStorage.setItem('refresh_token', res.data.refreshToken);
            localStorage.setItem('time_access_token', res.data.timeAccessTokenExpire);
            localStorage.setItem('user_id', res.data._id);
          }
        } else {
          setNoti({ open: true, content: res.message })
        }
      })
    }
  }, [step])


  if (step === 1) {
    return (
      <div className="login-page">
        <img className="logo-image" src={logoImage} alt="React Starter" />
        <SignUpForm signUpInfor={(value) => changeSignUpInfo(value)} invited_email={decoded?.data?.email} />
      </div>
    );
  }

  if (step === 2) {
    return (
      <SignUpForm2 signUpInfor={(value) => changeSignUpInfo(value)} />
    );
  }

  if (step === 3) {
    return (
      <div className="login-page">
        <img className="logo-image" src={logoImage} alt="React Starter" />
        <TermsConditions signUpInfor={(value) => changeSignUpInfo(value)} />
      </div>
    )
  }
  if (step === 4) {
    return (
      <div className="login-page">
        <img className="logo-image" src={logoImage} />
        <WaitMess />
      </div>
    )
  }
  if (step === 5) {
    return (
      <div className="login-page">
        <div className="loading-component">
          <img src={logoImage} />
          <Progress link='/home' />
        </div>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={noti.open}
          onClose={handleClose}
          message={noti.content}
        />
      </div>
    );
  }


};

export default PageSignUp;
