import React, { useEffect, useState } from 'react';
import { Snackbar } from "@mui/material";
import { apiAddProject, apiAddProjectTeamMember, apiUpdateProject } from '../../apis/callApi';
import AddProject from "./AddProject";
import CreateProject from './CreateProject';
import NextProject from './NextProject';

function PageAddProject(props) {
  const wellCome = localStorage.getItem('wellcome') || '';
  const [step, setStep] = useState(1);
  const [page, setPage] = useState(1);
  const [noti, setNoti] = useState({ open: false, content: '' });
  const [addProjectData, setAddProjectData] = useState({
    name: "",
    enableDomain: false,
  })

  const changeAddProjectInfo = (value) => {
    setAddProjectData({ ...addProjectData, ...value })
    setStep(step + 1)
  }

  const handleClose = () => {
    setNoti({ ...noti, open: false })
  }

  useEffect(() => {
    if (wellCome === '01') {
      setStep(2)
      setPage(2)
    } else {
      localStorage.setItem('wellcome', '01')
    }
  }, [])
 
 const renderText = () =>{
   return (
     <div>
       Project <b>{addProjectData.name}</b> has been created successfully
     </div>
   )
 }
  useEffect(() => {
    if (step === 2) {
      setPage(2)
    }
    if (step === 3) {
      const { email, ...body } = addProjectData;
      apiAddProject(body).then(res => {
        if (res.status === '00') {
          localStorage.setItem('new_project_id', res?.data?._id);
          setPage(3)
        } else {
          setPage(2)
          setStep(2)
          setNoti({ open: true, content: res.message })
        }
      })
    }
    if (step === 4) {
      const { email, ...body } = addProjectData;
      const projectId = localStorage.getItem('new_project_id');
      apiUpdateProject(projectId, body).then(res => {
        if (res.status === '00') {
          apiAddProjectTeamMember(projectId, { emails: email }).then(res => {
            if (res.status === '00') {
            setNoti({ open: true, content:renderText()})
            } else {
              setNoti({ open: true, content: 'Problem processing request! Please try again.'})
            }
          })
          window.location.replace('/home/project') 
        } else {
          setNoti({ open: true, content: res.message })
        }
      })
    }
  }, [step])
  if (page === 1) {
    return (
      <AddProject addProjectInfor={(value) => changeAddProjectInfo(value)} />
    )
  }
  if (page === 2) {
    return (
      <>
        <CreateProject addProjectInfor={(value) => changeAddProjectInfo(value)} />
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={noti.open}
          onClose={handleClose}
          message={noti.content}
        />
      </>
    )
  }
  if (page === 3) {
    return (
      <NextProject name={addProjectData.name} addProjectInfor={(value) => changeAddProjectInfo(value)} />
    )
  }
  if (page === 4) {
    return (
      <div className="feed">
        {/* <div className="feed-container">
          <h4>next</h4>
        </div> */}
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={noti.open}
          onClose={handleClose}
          message={noti.content}
        />
      </div>
    )
  }
}

export default PageAddProject;