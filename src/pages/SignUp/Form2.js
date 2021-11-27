import React, { useState, useCallback, useEffect } from "react";
import {
  Button,
  Snackbar,
  IconButton,
  Input,
  InputAdornment,
  FormControl,
  Box,
  Typography,
  Modal
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import logoImage from "src/assets/23rdc.svg";
import { URL_UPLOAD } from "src/apis/ip_config";
import axios, { post } from 'axios';
import { useDropzone } from 'react-dropzone'
const style = {
  position: 'absolute',
  top: '0%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '600px',
  height: '500px',
  bgcolor: '#252628',
  // border: '2px solid #000',
  boxShadow: 0,
  p: 4,
};
export default function SignUpForm2(props) {

  const onDrop = useCallback(file => {
    if (file) {
      handleUpload(file, "drop")
    }
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  const { signUpInfor } = props;
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    avatar: ""
  });

  const [open, setOpen] = useState(false);
  const [noti, setNoti] = useState({ open: false, content: '' });
  const [isCheckDisabled, setIsCheckDisabled] = useState(true);
  const [isShowAvatar, setIsShowAvatar] = useState(false);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickResetFirstName = () => {
    setValues({
      ...values,
      firstName: "",
    });
  };
  const handleClickResetLastName = () => {
    setValues({
      ...values,
      lastName: "",
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    signUpInfor(values);
  }

  const handleOpen = (event) => {
    event.preventDefault();
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  const handleCloseNoti = () => {
    setNoti({ ...noti, open: false })
  }

  const [imageLink, setImagelink] = useState(null);
  const handleUpload = (e, type) => {
    console.log(e)
    let file;
    if (type === "click") {
      file = e.target.files[0]
    } else {
      file = e?.[0]
    }
    if (file) {
      let data = new FormData()
      data.append("files", file)
      data.append("name", file.name)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      post(URL_UPLOAD, data, config).then(res => {
        if (res) {
          console.log("res", res)
          handleClose();
          setValues({
            ...values,
            avatar: res?.data?.path
          })
          setIsShowAvatar(true)
        }
      })
    }
  }

  useEffect(() => {
    if (values.firstName !== "" && values.lastName !== "") {
      setIsCheckDisabled(false)
    }else{
      setIsCheckDisabled(true)
    }
  }, [values])

  return (
    <div className="login-page" onSubmit={handleSubmit}>
      <img className="logo-image" src={logoImage} alt="React Starter" />
      <form className="login-form">
        <FormControl
          sx={{ m: 1, width: "25ch", borderColor: "primary.main" }}
          variant="standard"
        >
          <div className="login-label-input">Profile picture</div>
          <div style={{ display: "flex", alignItems: "center", marginTop: "13px" }}>
            {
              isShowAvatar ? <img onClick={(event) => handleOpen(event)} className="login-avatar-add" src={values?.avatar}></img> : <button className="login-avatar-add" onClick={(event) => handleOpen(event)}>+</button>
            }
            <div onClick={(event) => handleOpen(event)} className="login-avatar-text">{isShowAvatar ? "Change picture" : "Click, or Drag & Drop"}</div>
          </div>
        </FormControl>
        <FormControl
          sx={{ m: 1, width: "25ch", borderColor: "primary.main" }}
          variant="standard"
        >
          <div className="login-label-input">First name</div>
          <Input
            className="login-input"
            disableUnderline={true}
            placeholder="Enter your first name..."
            type="text"
            value={values.firstName}
            onChange={handleChange("firstName")}
            endAdornment={
              <InputAdornment fontSize="small" position="end">
                <IconButton onClick={handleClickResetFirstName}>
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
        <FormControl
          sx={{ m: 1, width: "25ch", borderColor: "primary.main" }}
          variant="standard"
        >
          <div className="login-label-input">Last name</div>
          <Input
            className="login-input"
            disableUnderline={true}
            placeholder="Enter your last name..."
            type="text"
            value={values.lastName}
            onChange={handleChange("lastName")}
            endAdornment={
              <InputAdornment fontSize="small" position="end">
                <IconButton onClick={handleClickResetLastName}>
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
        <Button
          disabled={isCheckDisabled}
          className="login-btn"
          style={{ height: "26.48px" }}
          variant="contained"
          type="submit">
          Sign Up
        </Button>
      </form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} {...getRootProps()}>
          <Typography sx={{ mt: 40, color: '#C6D5D0', ml: 20 }}>
            <label htmlFor="upload" style={{ cursor: "pointer" }}>Choose picture to upload</label>
            <input
              // {...getInputProps()}
              type="file"
              id="upload"
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => handleUpload(e, "click")}
            ></input>
          </Typography>
        </Box>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={noti.open}
        onClose={handleCloseNoti}
        message={noti.content}
      />
    </div>
  );
}
