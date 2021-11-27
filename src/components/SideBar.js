import React, { useState, useEffect } from 'react';
import logoImage from 'src/assets/logo.svg';
import FolderIcon from '@mui/icons-material/Folder';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ForumIcon from '@mui/icons-material/Forum';
import { Link, useHistory, useLocation } from "react-router-dom";
import { Modal, Avatar } from 'antd';
import { apiGetListProject,apiGetProjectTeamMember } from "src/apis";
import { Snackbar } from '@mui/material';
function SideBar(props) {
  const location = useLocation();
  const projectId = location?.state?.project_id || localStorage.getItem('new_project_id') || '';
  const history = useHistory();
  const [listProject, setListProject] = useState([]);
  const [listMember, setListMember] = useState([]);
  const [isShowModalClient, setIsShowModalClient] = useState(false);
  const [noti, setNoti] = useState({ open: false, content: '' });
  useEffect(() => {

      apiGetProjectTeamMember(projectId).then(res => {
        if (res.status === '00') {
          setListMember(res.data && res.data.members)
        } else {
          // setNoti({ open: true, content: 'An error occurred' })
        }
      })
    
  }, [projectId])
  const handleClose = () => {
    setNoti({ ...noti, open: false })
  }
  const handleCloseModalClient = () => {
    setIsShowModalClient(false)
  }
  const handleShowModalClient = () => {
    setIsShowModalClient(true)
  }

  useEffect(() => {
    apiGetListProject().then(res => {
      if (res.status === '00') {
        const projects = res.data && res.data.projects;
        setListProject(projects)
      }
    })
  }, [])
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-container">
          <div className="sidebar-header">
            <img className='sidebar-logo-image' src={logoImage} alt="React Starter" />
          </div>
          <div className="sidebar-list">
            <div className="sidebar-title">
              <div className="sidebar-text">
                <FolderIcon sx={{ color: "#D3DEE0",width:"12px",height:"11px" }} />
                <p>Project</p>
              </div>
              <AddBoxIcon style={{cursor:"pointer"}} sx={{ color: "#D3DEE0",width:"11.77px",height:"11.77px" }} onClick={() => history.push('/home')} />
            </div>
            <ul className="sidebar-menu">
              {listProject?.map((item, index) =>
              (<li key={index}><Link to={(location) => (
                { ...location, pathname: "/home/project", state: { project_id: item._id } }
              )
              }>{`#${item.name}`}</Link ></li>)
              )}
            </ul>
          </div>
          <div className="sidebar-list">
            <div className="sidebar-title">
              <div className="sidebar-text">
                <ForumIcon sx={{ color: "#D3DEE0",width:"12px",height:"11px"}} />
                <p>People</p>
              </div>
              <AddBoxIcon sx={{ color: "#D3DEE0",width:"11.77px",height:"11.77px" }} />
            </div>
            <ul className="sidebar-menu">
              {listMember?.map((item,index) => {
                return (<li key={index}><a onClick={handleShowModalClient}>{item?.name}</a></li>)
              })}
            </ul>
          </div>
        </div>

      </div>
      <Modal
        title=""
        style={{ right: "50px", top: "150px" }}
        visible={isShowModalClient}
        mask={false}
        className="header-modalcustom"
        // onOk={handleShowModal}
        onCancel={handleCloseModalClient}
        footer={null}
        width={650}
        bodyStyle={{
          backgroundColor: '#232324',
        }}
      >
        <div className="modal-client">
          <div className="modal-avatar">
            <Avatar size={60} style={{ backgroundColor: '#f56a00' }}>AU</Avatar>
          </div>
          <div className="modal-container">
            <div className="modal-left">
              <div className="modal-user">
                <h4>Elisa J.</h4>
                <p>Joined on 27/07/2012</p>
              </div>
              <div className="modal-item">
                <h4>Role</h4>
                <h5>Project director</h5>
              </div>
              <div className="modal-item">
                <h4>Description</h4>
                <h5>Everything looks pretty good so far, if by good I mean truly awful. I mean, who designed this; Srevie Wonder? Hmmmmm. The UI for this Portal is dope though.</h5>
              </div>
              <div className="modal-item">
                <h4>Email address</h4>
                <h5>elisaj@twentythirdc.com</h5>
              </div>
              <div className="modal-item">
                <h4>Projects</h4>
                <h5>Peppa Pig China commercial, Peppa Pig China commercial, Peppa Pig China commercial, Peppa Pig China commercial</h5>
              </div>
            </div>
            <div className="modal-right">
              <div className="modal-item">
                <h4>Status</h4>
                <h5>Holiday</h5>
              </div>
              <div className="modal-item">
                <h4>Local time</h4>
                <h5>23:57 (CET)</h5>
              </div>
              <div className="modal-item">
                <h4>Invited by</h4>
                <h5>Nikhill</h5>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={noti.open}
        onClose={handleClose}
        message={noti.content}
      />
    </>
  );
}

export default SideBar;