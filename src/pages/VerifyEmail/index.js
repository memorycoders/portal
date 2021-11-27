import React, { useState, useEffect } from "react";
import logoImage from "../../assets/23rdc.svg";
import Progress from "src/components/Progress";
import { useLocation } from "react-router-dom";
import { apiVerifyEmail } from "../../apis/callApi";
import { Snackbar } from "@mui/material";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyEmail = (props) => {
  const query = useQuery();
  const code = query.get("code");
  const userId = query.get("userId");
  const [noti, setNoti] = useState({ open: false, content: '' });
  useEffect(() => {
    if (code !== '' && userId !== '') {
      apiVerifyEmail({ code, userId }).then(res => {
        if (res.status === '00') {
          localStorage.setItem('access_token', res.data.accessToken);
          localStorage.setItem('refresh_token', res.data.refreshToken);
          localStorage.setItem('time_access_token', res.data.timeAccessTokenExpire);
          localStorage.setItem('user_name',res.data.username);
          localStorage.setItem('user_id',res.data._id)
          setNoti({ open: true, content: 'Verify email success' })
        } else {
          setNoti({ open: true, content: res.message })
        }
      })
    }
  }, [code, userId])

  const handleClose = () => {
    setNoti({ ...noti, open: false })
  }
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
};

export default VerifyEmail;
