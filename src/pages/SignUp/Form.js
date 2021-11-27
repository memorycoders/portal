import React, { useState,useEffect } from "react";
import {
  Button,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  FormControl,
  Snackbar
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import { validateEmail } from "src/utils/Validation";

export default function SignUpForm(props) {
  const { signUpInfor,invited_email=''} = props;
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    confirm_password: "",
    showPassword: false,
    showRePassword: false,
  });

  const [noti, setNoti] = useState({ open: false, content: '' });
  const [isCheckDisabled,setIsCheckDisabled] = useState(true);

  useEffect(() => {
    setValues({...values,email:invited_email})
  }, [invited_email])

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickResetUsername = () => {
    setValues({
      ...values,
      email: "",
    });
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleClickShowRePassword = () => {
    setValues({
      ...values,
      showRePassword: !values.showRePassword,
    });
  };

  
  useEffect(() => {
    if (values.email !== "" && values.password !== "" && values.confirm_password !=="") {
      setIsCheckDisabled(false)
    }else{
      setIsCheckDisabled(true)
    }
  }, [values])
  function handleSubmit(event) {
    event.preventDefault();
    const { showPassword, showRePassword, ...signUpInfo } = values;
    if (validateEmail(values.email)) {
      if(values.password === values.confirm_password){
        signUpInfor(signUpInfo);
      }else{
        setNoti({ open: true, content: 'Re-password is incorrect' })
      }
    } else {
      setNoti({ open: true, content: 'Please type a email' })
    }
  }
  const handleClose = () => {
    setNoti({ ...noti, open: false })
  }
  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <FormControl
          sx={{ m: 1, width: "25ch", borderColor: "primary.main" }}
          variant="standard"
        >
          <div className="login-label-input">E-mail Address</div>
          <Input
            className="login-input"
            disableUnderline={true}
            readOnly={(invited_email!=='')}
            placeholder="Enter E-mail..."
            type="text"
            value={values.email}
            onChange={handleChange("email")}
            endAdornment={
              (invited_email!=='')?false:
              <InputAdornment fontSize="small" position="end">
                <IconButton onClick={handleClickResetUsername}>
                  <CloseIcon
                    sx={{ color: "#29292B" ,width:"15px"}}
                    fontSize="small"
                    position="end"
                  ></CloseIcon>
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl
          sx={{ m: 1, width: "25ch", borderColor: "red" }}
          variant="standard"
        >
          <div className="login-label-input">Password</div>

          <Input
            disableUnderline={true}
            placeholder="Enter password..."
            className="login-input"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment fontSize="small" position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                // onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? (
                    <VisibilityOff
                      sx={{ color: "#29292B",width:"15px" }}
                      fontSize="small"
                      position="end"
                    />
                  ) : (
                    <Visibility
                      sx={{ color: "#29292B",width:"15px" }}
                      fontSize="small"
                      position="end"
                    />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl
          sx={{ m: 1, width: "25ch", borderColor: "red" }}
          variant="standard"
        >
          <div className="login-label-input">Repeat Password</div>

          <Input
            disableUnderline={true}
            placeholder="Enter password..."
            className="login-input"
            type={values.showRePassword ? "text" : "password"}
            value={values.confirm_password}
            onChange={handleChange("confirm_password")}
            endAdornment={
              <InputAdornment fontSize="small" position="end">
                <IconButton
                  onClick={handleClickShowRePassword}
                // onMouseDown={handleMouseDownPassword}
                >
                  {values.showRePassword ? (
                    <VisibilityOff
                      sx={{ color: "#29292B",width:"15px" }}
                      fontSize="small"
                      position="end"
                    />
                  ) : (
                    <Visibility
                      sx={{ color: "#29292B",width:"15px" }}
                      fontSize="small"
                      position="end"
                    />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          disabled={isCheckDisabled}
          className="login-btn"
          variant="contained"
          style={{ height: "26.48px" }}
          type="submit">
          Sign Up
        </Button>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={noti.open}
        onClose={handleClose}
        message={noti.content}
      />
    </>
  );
}
