import React,{useState,useEffect} from "react";
import ResetForm from "./ResetForm";
import { Snackbar } from "@mui/material";
import logoImage from "../../assets/23rdc.svg";
import { apiLoginPass, apiResetPass,apiValidResetPass } from "../../apis";
import Progress from "src/components/Progress";
import { useLocation, Redirect } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const PageResetPass = (props) => {
  const query = useQuery();
  const code = query.get("code");
  const email = query.get("email");
  const [step, setStep] = useState(1);
  const [page, setPage] = useState(1);
  const [dataResetPass, setDataResetPass] = useState({
    email:'',
    code:'',
    password:'',
    confirm_password:''
  })

  useEffect(() => {
    apiValidResetPass({code,email}).then(res => {
      if(res.status = '00'){
      }else{
        setPage(0)
      }
    })
  }, [code,email])
  useEffect(() => {
    if((code !== null) && (email !== null)){
      setDataResetPass({...dataResetPass,code,email:decodeURIComponent(email)})
    }
  }, [code,email])
  const [noti, setNoti] = useState({ open: false, content: '' });
  const changeResetInfo = (value) => {
    setDataResetPass({...dataResetPass,...value});
    setStep(step + 1)
  }

  const handleClose = () => {
    setNoti({ ...noti, open: false })
  }

  useEffect(() => {
    if(step === 2) {
      apiResetPass(dataResetPass).then(res =>{
        if(res.status === '00'){
          const decodeEmail = decodeURIComponent(dataResetPass.email);
          setNoti({ open: true, content: "Reset password success"})
          apiLoginPass({},decodeEmail, dataResetPass.password)
            .then(res => {
              if (res.status === '00') {
                setPage(2)
                localStorage.setItem('access_token', res.data.accessToken);
                localStorage.setItem('refresh_token', res.data.refreshToken);
                localStorage.setItem('time_access_token', res.data.timeAccessTokenExpire);
                localStorage.setItem('user_name',res.data.username);
                localStorage.setItem('user_id',res.data._id)
              } else {
                setNoti({ open: true, content: res.message })
              }
            }
          )
        }else{
          setNoti({ open: true, content: res.message })
          setStep(1)
        }
      })
    }
  }, [step])
  if(page === 0 ){
    return ( <Redirect to='/404' />)
  }
  if(page === 1){
    return (
      <div className="login-page">
        <img className="logo-image" src={logoImage}/>
        <ResetForm resetInfo = {(value) => changeResetInfo(value)}/>
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

export default PageResetPass;
