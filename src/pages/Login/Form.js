import React, { useState, useEffect} from "react";
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
import { Link, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export default function LoginForm(props) {
  const query = useQuery();
  const invite_token = query.get("data");
  if(invite_token != null && invite_token != ''){
    var decoded = jwt_decode(invite_token) || '';
    var header = {invite_data:invite_token}
  }else{
    var decoded = '';
    var header = {}
  }
  const { loginStatus } = props;
  const history = useHistory();
  const [noti, setNoti] = useState({ open: false, content: '' });
  const [disabledButton, setDisabledButton] = useState(true)
  const [values, setValues] = React.useState({
    username: "",
    password: "",
    showPassword: false,
  });

  useEffect(()=> {
    setValues({...values,username:decoded?.data?.email})
  },[invite_token])
  useEffect(() => {
    if (values.password !== "" && values.username !== "") {
      setDisabledButton(false)
    }else{
      setDisabledButton(true)
    }
  }, [values])

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickResetUsername = () => {
    setValues({
      ...values,
      username: "",
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    apiLoginPass({...header},values.username, values.password)
      .then(res => {
        if (res.status === '00') {
          localStorage.setItem('access_token', res.data.accessToken);
          localStorage.setItem('refresh_token', res.data.refreshToken);
          localStorage.setItem('time_access_token', res.data.timeAccessTokenExpire);
          localStorage.setItem('user_name',res.data.username);
          localStorage.setItem('user_id',res.data._id)
          loginStatus(true);
        } else {
          setNoti({ open: true, content: res.message })
        }
      }
    )
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
        <div className="login-label-input">Username / E-mail</div>
        <Input
          className="login-input"
          disableUnderline={true}
          placeholder="Enter username..."
          type="text"
          value={values.username}
          onChange={handleChange("username")}
          endAdornment={
            <InputAdornment fontSize="10px" position="end">
              <IconButton onClick={handleClickResetUsername}>
                <CloseIcon
                  sx={{ color: "#29292B",width:"15px" }}
                  fontSize="10px"
                  position="end"
                ></CloseIcon>
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl
        sx={{ m: 1, width: "193px", borderColor: "red" }}
        variant="standard"
      >
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid className="login-label-input">Password</Grid>
          <Grid className="login-forgot-password">
            <Link to="/forgot-password" style={{ color: '#FFB500' }}>
              Forgot password?
            </Link>
          </Grid>
        </Grid>

        <Input
          disableUnderline={true}
          placeholder="Enter password..."
          className="login-input"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          endAdornment={
            <InputAdornment fontSize="10px" position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? (
                  <VisibilityOff
                    sx={{ color: "#29292B" ,width:"15px"}}
                    fontSize="10px"
                    position="end"
                 
                  />
                ) : (
                  <Visibility
                    sx={{ color: "#29292B",width:"15px"}}
                    fontSize="10px"
                    position="end"
                  />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button disabled={disabledButton} style={{ height: "26.48px" }} className="login-btn" variant="contained" type="submit">
        Login
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
