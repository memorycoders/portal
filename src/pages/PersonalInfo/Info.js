import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import AvatarImage from "src/assets/avatar.png";
import { apiGetUserInfo, apiListTimezone } from "../../apis/callApi";
import { Snackbar } from '@mui/material';
import moment from 'moment'
const Info = () => {
  const [age, setAge] = React.useState("");
  const [timezone, setTimezone] = React.useState("");
  const [noti, setNoti] = useState({ open: false, content: '' });
  const [info, setInfo] = React.useState(null);
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    apiGetUserInfo().then(res => {
      console.log(res)
      if (res.status === "00") {
        setInfo(res?.data);
        localStorage.setItem('labelName', `${res?.data?.firstName} ${res?.data?.lastName[0]?.toUpperCase()}.`)
      } else {
        setNoti({ open: true, content: 'Problem processing request! Please try again.' })
      }
    })
  }, []);

  useEffect(() => {
    apiListTimezone().then(res => {
      setTimezone(res)
    })
  }, []);
  const handleClose = () => {
    setNoti({ ...noti, open: false })
  }
  return (
    <>
      <div className="info-container">
        <div className="info-avatar">
          <Avatar sx={{ width: 71, height: 71 }} src={info?.avatar ? info?.avatar : AvatarImage} />
        </div>
        <div className="info-user">
          <div className="info-name">{info?.name}</div>
          <div className="info-joined">Joined on {moment(info?.createdAt).format('DD/MM/YYYY')}</div>
          <div className="info-label">Role</div>
          <div className="info-text">{info?.typeUser}</div>
          <div className="info-label">Description</div>
          <div className="info-descript-text">{info?.description}</div>
          <div className="info-label">Email address</div>
          <div className="info-text">{info?.email}</div>
          <div className="info-label">Projects</div>
          <div className="info-text">
            {info?.projects?.map((item,index) => {
              if(index === 0 ){
                return item.name
              }
              return `, ${item.name}`
            })}
          </div>
          <button className="info-complete-btn">Complete profile</button>
        </div>
        <div className="info-status-time">
          <div className="info-label">Status</div>
          <select className="info-select" name="holiday">

            <option className="info-options">Holiday</option>
            <option className="info-options">Holiday1</option>
            <option className="info-options">Holiday2</option>
            <option className="info-options">Holiday3</option>
          </select>
          <div className="info-label">Local time</div>
          <div className="info-label">{console.log('timezone', timezone.data)}</div>
          <select
            className="browser-default info-select"
            value={info?.timezone?.value}
          >
            {timezone.data && timezone.data.map(item => (
              <option className="info-options"
                key={item.value}
                value={item.value}
              >
                {item.text.slice(0, 12)}
              </option>
            ))}
          </select>
          <div className="info-invite-label">Invited by</div>
          <div className="info-text">
            {`${info?.invitedBy?.firstName || ''} ${info?.invitedBy?.lastName || ''}`}
          </div>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={noti.open}
        onClose={handleClose}
        message={noti.content}
      />
    </>
  );
};
export default Info;
