import React, { useEffect, useState } from "react";
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
import { apiLoginPass } from "src/apis/callApi";
import { useHistory } from "react-router";
import { validateEmail } from "src/utils/Validation";
// import Form from "rc-field-form/es/Form";

export default function ForgotForm(props) {
  const { forgotInfo } = props;
  const history = useHistory();
  const [values, setValues] = React.useState({
    email: "",
  });
  const [noti, setNoti] = useState({ open: false, content: '' });
  const [isCheckDisabled, setIsCheckDisabled] = useState(true);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickResetUsername = () => {
    setValues({
      ...values,
      email: "",
    });
  };

  useEffect(() => {
    if (values.email !== "") {
      setIsCheckDisabled(false)
    } else {
      setIsCheckDisabled(true)
    }
  }, [values])

  function handleSubmit(event) {
    event.preventDefault();
    if (validateEmail(values.email)) {
      forgotInfo(values)
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
          <div className="login-label-input">E-mail to recover password</div>
          <Input
            className="login-input"
            disableUnderline={true}
            placeholder="Enter E-mail address..."
            type="text"
            value={values.email}
            onChange={handleChange("email")}
            endAdornment={
              <InputAdornment fontSize="small" position="end">
                <IconButton onClick={handleClickResetUsername}>
                  <CloseIcon
                    sx={{ color: "#29292B" }}
                    fontSize="small"
                    position="end"
                  ></CloseIcon>
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button style={{height: "26.48px"}} disabled={isCheckDisabled} className="login-btn" variant="contained" type="submit">
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
