import React, {useState, useEffect} from "react";
import {
  Button,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  FormControl,
  Form,
  Snackbar
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import { apiLoginPass } from "src/apis/callApi";
import { useHistory } from "react-router";

export default function ResetForm(props) {
  const {resetInfo} = props;
  const history = useHistory();
  const [values, setValues] = useState({
    password:'',
    confirm_password:'',
    showPassword: false,
    showRePassword: false,
  });
  const [isCheckDisabled,setIsCheckDisabled] = useState(true);
  const [noti, setNoti] = useState({ open: false, content: '' });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  function handleSubmit(event) {
    event.preventDefault();
    const { showPassword, showRePassword, ...resetData } = values;
    if(values.password === values.confirm_password){
      resetInfo(resetData)
    }else{
      setNoti({ open: true, content: 'Re-password is incorrect' })
    }
  }

  const handleClose = () => {
    setNoti({ ...noti, open: false })
  }

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
    if ( values.password !== "" && values.confirm_password !=="") {
      setIsCheckDisabled(false)
    }else{
      setIsCheckDisabled(true)
    }
  }, [values])

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
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
          type="submit">
          Reset Password
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
