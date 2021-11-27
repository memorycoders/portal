import React, { useState, useEffect } from "react";
import ForgotForm from "./Form";
import { Snackbar } from "@mui/material";
import logoImage from "../../assets/23rdc.svg";
import { apiForgotPass } from "../../apis";
import Progress from "src/components/Progress";
import SuccessForm from "./SuccessForm";

const PageForgotPass = (props) => {
  const [step, setStep] = useState(1);
  const [page, setPage] = useState(1);
  const [dataForgotPass, setDataForgotPass] = useState({
    email: '',
  })
  const [noti, setNoti] = useState({ open: false, content: '' });
  const [resendSuccess, setResendSuccess] = useState(true);
  const changeForgotInfo = (value) => {
    setDataForgotPass({ ...dataForgotPass, ...value });
    setStep(step + 1)
  }

  const handleClose = () => {
    setNoti({ ...noti, open: false })
  }

  useEffect(() => {
    if (step === 2) {
      apiForgotPass({ email: dataForgotPass.email }).then(res => {
        if (res.status === '00') {
          setPage(2)
        } else {
          setNoti({ open: true, content: res.message })
          setStep(1)
        }
      })
    }
  }, [step]);

  const handleReSend = () => {
    setResendSuccess(false)
    apiForgotPass({ email: dataForgotPass.email }).then(res => {
      if (res.status === '00') {
        setNoti({ open: true, content:"Please check your email" })
      } else {
        setNoti({ open: true, content: res.message })
        setStep(1)
      }
      setResendSuccess(true)
    })
  }
  if (page === 1) {
    return (
      <div className="login-page">
        <img className="logo-image" src={logoImage} alt="React Starter" />
        <ForgotForm forgotInfo={(value) => changeForgotInfo(value)} />
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={noti.open}
          onClose={handleClose}
          message={noti.content}
        />
      </div>
    );
  }
  if (page === 2) {
    return (
      <div className="login-page">
        <div className="login-container">
          <img className="logo-image" src={logoImage} />
          <SuccessForm onReSend={() => handleReSend()} resendSuccess={resendSuccess}/>
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

export default PageForgotPass;
