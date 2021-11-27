import React,{useState,useEffect} from "react";
import { Snackbar } from "@mui/material";
import logoImage from "../../assets/23rdc.svg";
import {apiJoinProject } from "../../apis";
import Progress from "src/components/Progress";
import { useLocation, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const JoinProject = (props) => {
  const query = useQuery();
  const [page, setPage] = useState(1);
  const invite_token = query.get("data");
  if(invite_token != null && invite_token != ''){
    var decoded = jwt_decode(invite_token) || '';
    var header = {invite_data:invite_token}
  }else{
    var decoded = '';
    var header = {}
  }
  console.log(decoded)
  useEffect(() => {
    apiJoinProject(header,{}).then(res => {
      if(res.status === '00') {
        setPage(2)
      }
      if(res.data.action==='login'){
        setPage(3)
      }
      if(res.data.action ==='signup'){
        setPage(4)
      }
    })
  }, [invite_token])
  if(page === 2 ){
    return ( <Redirect  to={(location) => (
      { ...location, pathname: "/home/project", state: { project_id: decoded?.data?.projectId} })} />)
  }
  if(page === 1){
    return (
      <div className="login-page">
        {/* <img className="logo-image" src={logoImage}/>
        <ResetForm resetInfo = {(value) => changeResetInfo(value)}/>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={noti.open}
          onClose={handleClose}
          message={noti.content}
        /> */}
      </div>
    );
  } 
  if(page === 3){
    return (
      <Redirect to={`/login?data=${invite_token}`} />
    )
  }
  if(page === 4){
    return (
      <Redirect to={`/signup?data=${invite_token}`} />
    )
  }
  
};

export default JoinProject;
