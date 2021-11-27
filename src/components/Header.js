import React, { useState, useEffect } from 'react';
import { Snackbar } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Avatar, Divider, Tooltip, Modal, Button } from 'antd';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link, useLocation } from "react-router-dom";
import {
  apiGetProjectDetail,
  apiDelProject,
  apiGetProjectClient,
  apiGetProjectTeamMember,
  apiAddProjectClient,
  apiAddProjectTeamMember,
  apiGetUserInfo,
  apiUpdateProject
} from "src/apis";

function Header(props) {
  const { isSelectedProject } = props;
  const location = useLocation();
  const projectId = location?.state?.project_id || localStorage.getItem('new_project_id') || '';
  const userId = localStorage.getItem('user_id') || '';
  const [noti, setNoti] = useState({ open: false, content: '' });
  const [projectData, setProjectData] = useState({});
  const [listMember, setListMember] = useState([]);
  const [listClient, setListClient] = useState([])
  const [isShowModal, setIsShowModal] = useState(false);
  const [isClientView, setIsClientView] = useState(true);
  const [addMember, setAddMember] = useState('')
  const [userInfo, setUserInfo] = useState('')
  const [enableDomain, setEnableDomain] = useState(true)

  useEffect(() => {
    setEnableDomain(projectData?.enableDomain)
  }, [projectData])

  useEffect(() => {
    apiGetUserInfo().then(res => {
      if (res.status === '00') {
        setUserInfo(res.data)
      }
    })
  }, [])

  useEffect(() => {
    if (isSelectedProject === true) {
      apiGetProjectDetail(projectId).then(res => {
        if (res.status === '00') {
          setProjectData(res.data && res.data.project)
        } else {
          setNoti({ open: true, content: 'Problem processing request! Please try again.' })
        }
      })
      apiGetProjectClient(projectId).then(res => {
        if (res.status === '00') {
          setListClient(res.data && res.data.members)
        } else {
          setNoti({ open: true, content: 'Problem processing request! Please try again.' })
        }
      })
      apiGetProjectTeamMember(projectId).then(res => {
        if (res.status === '00') {
          setListMember(res.data && res.data.members)
        } else {
          setNoti({ open: true, content: 'Problem processing request! Please try again.' })
        }
      })
    }
  }, [projectId, isSelectedProject])

  useEffect(() => {
    if ((listMember?.findIndex((item) => item._id = userId)) > -1) {
      setIsClientView(false)
    } else {
      setIsClientView(true)
    }
  }, [listMember])
  const handleClose = () => {
    setNoti({ ...noti, open: false })
  }

  const renderText = () => {
    return (
      <div>Project <b>{projectData.name}</b> has been closed. You'll not be able to access it anymore.</div>
    )
  }
  const handleCloseProject = () => {
    apiDelProject(projectId).then(res => {
      if (res.status === '00') {
        setNoti({ open: true, content: renderText() })
        window.location.replace('/home');
      } else {
        setNoti({ open: true, content: 'Problem processing request! Please try again.' })
      }
    })
  }

  const handleShowModal = () => {
    setIsShowModal(true)
  }
  const handleCloseModal = () => {
    setIsShowModal(false)
  }

  const [isShowModalProjectTeam, setIsShowModalProjectTeam] = useState(false)
  const handleCloseModalProjectTeam = () => {
    setIsShowModalProjectTeam(false)
    setAddMember('');
  }
  const handleShowModalProjectTeam = () => {
    setIsShowModalProjectTeam(true)
  }

  const handleSubmitAddMember = (event) => {
    event.preventDefault();
    const list = addMember.split(",");
    if (list.length > 0 && list[0] !=='') {
      const body = { emails: list };
      apiAddProjectTeamMember(projectId, body).then(res => {
        if (res.status === '00') {
          setNoti({ open: true, content: 'The invitations have been sent to your team members.' })
        } else {
          setNoti({ open: true, content: res.message })
        }
      })
      setAddMember('');
      setIsShowModalProjectTeam(false);
      setIsShowModalAddTeam(false);
    }
  }

  function copyToClipboard(textToCopy) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(textToCopy);
    } else {
      let textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      return new Promise((res, rej) => {
        document.execCommand('copy') ? res() : rej();
        textArea.remove();
      });
    }
  }

  const handleCopyText = () => {
    const text = `${projectData?.name}/twentythirdc.com/auth/join-team`
    copyToClipboard(text).then(() => setNoti({ open: true, content: 'Copied!' }))
  }

  const [isShowModalAddTeam, setIsShowModalAddTeam] = useState(false)
  const handleCloseModalAddTeam = () => {
    setIsShowModalAddTeam(false);
    setAddMember('');
  }

  const handleShowModalAddTeam = () => {
    setIsShowModalAddTeam(true)
  }


  const [isShowModalAddClient, setIsShowModalAddClient] = useState(false)
  const [addClient, setAddClient] = useState("")
  const handleSubmitClient = (e) => {
    e.preventDefault();
    console.log("addClient", addClient)
  }
  const handleShowModalClient = () => {
    setIsShowModalAddClient(true)
  }
  const handleCloseModalAddClient = () => {
    setIsShowModalAddClient(false)
  }

  const [isShowModalClientTeam, setIsShowModalClientTeam] = useState(false)
  const handleCloseModalClientTeam = () => {
    setIsShowModalClientTeam(false)
  }
  const handleShowModalClientTeam = () => {
    setIsShowModalClientTeam(true)
  }

  const handleSwitchEnableDomain = () => {
    apiUpdateProject(projectId, { enableDomain: !enableDomain, name: projectData?.name }).then(res => {
      if (res.status === '00') {
        setEnableDomain(!enableDomain)
      } else {
        setNoti({ open: true, content: res.message })
      }
    })
  }
  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      '&:after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
    },
  }));
  return (
    <div className="header">
      <div className="header-container">
        <div className="header-left">
          {isSelectedProject &&
            <>
              <h4 style={{ cursor: "pointer" }}>{`#${projectData && projectData.name}`}</h4>
              <button className="btn-custom" onClick={handleShowModal}>Edit info <ErrorOutlineIcon sx={{ color: "#D4DFE1", width: "10px", height: "10px" }} /></button>
            </>
          }
        </div>
        <div className="header-right">
          {isSelectedProject &&
            <>
              <div className="header-team dflex ">
                <span className="header-title" style={{ cursor: "pointer" }} onClick={handleShowModalProjectTeam}>Team:</span>
                <Avatar.Group >
                  {listMember?.map((item, index) => {
                    return (<Avatar size={25} key={index} style={{ backgroundColor: '#707070', fontSize: "10.165px", color: "#D3DEE0" }}>{item?.name?.slice(0, 2)}</Avatar>)
                  })}
                </Avatar.Group>
                <AddBoxIcon  style={{ cursor: "pointer",marginRight:"36.3px",marginLeft:"16.5px" }} sx={{ color: "#D3DEE0",width:"11.77px",height:"11.77px" }} onClick={handleShowModalAddTeam} />
              </div>
              <div className="header-client  dflex ">
                <span className="header-title" style={{ cursor: "pointer" }} onClick={handleShowModalClientTeam}>Client:</span>
                <Avatar.Group>
                  {listClient?.map((item, index) => {
                    return (<Avatar size={25} key={index} style={{ backgroundColor: '#707070', fontSize: "10.165px", color: "#D3DEE0" }}>{item?.name?.slice(0, 2)}</Avatar>)
                  })}
                </Avatar.Group>
                <AddBoxIcon onClick={handleShowModalClient} style={{ cursor: "pointer" ,marginRight:"36.3px"}}  sx={{ color: "#D3DEE0",width:"11.77px",height:"11.77px" }} />
              </div>
              <div className="header-client-view">
                <button className="btn-customview dflex">{isClientView ? 'Client View' : 'Team View'} </button>
              </div>
            </>}
          <div className="header-avatar">
            <Link to="/user-info" className="header-username">
              {userInfo !== '' ? `${userInfo?.firstName} ${userInfo?.lastName[0]?.toUpperCase()}.` : ''}
            </Link>
            <Avatar size={25} style={{ backgroundColor: '#f56a00', fontSize: "10.165px", color: "#D3DEE0" }}>AU</Avatar>
          </div>
        </div>
      </div>
      <Modal
        title=""
        style={{ right: "258px", top: "60px" }}
        visible={isShowModal}
        mask={false}
        className="header-modalcustom"
        // onOk={handleShowModal}
        onCancel={handleCloseModal}
        footer={null}
        width={642}
        bodyStyle={{
          backgroundColor: '#232324',
        }}
      >
        <div className="modal-content">
          <div className="modal-box">
            <div className="modal-head">
              <h4>Project Info</h4>
              <p>{`Opened on ${projectData?.createdAt?.slice(0, 10)}`}</p>
            </div>
            <div className="modal-container">
              <div className="modal-left">
                <div className="modal-item">
                  <h4>Status</h4>
                  <h5>Active</h5>
                </div>
                <div className="modal-item">
                  <h4>Total messages</h4>
                  <h5>0</h5>
                </div>
                <div className="modal-item">
                  <h4>Total videos</h4>
                  <h5>0 - 0KB</h5>
                </div>
                <div className="modal-item">
                  <h4>Total images</h4>
                  <h5>0 - 0KB</h5>
                </div>
              </div>
              <div className="modal-right">
                <div className="modal-item">
                  <h4>Project admin</h4>
                  {listMember?.map((item, index) => {
                    if (item.role === 'admin') {
                      return <h5 key={index}>{item.name}</h5>
                    }
                  })}
                </div>
                <div className="modal-item">
                  <h4>Client admin</h4>
                  {listClient?.map((item, index) => {
                    if (item.role === 'admin') {
                      return <h5 key={index}>{item.name}</h5>
                    }
                  })}
                </div>
                <div className="modal-btn">
                  <button onClick={handleCloseProject}>Close project</button>
                  <button>Leave project</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>


      <Modal
        title=""
        style={{ left: "180px", top: "60px" }}
        visible={isShowModalProjectTeam}
        mask={false}
        className="modalcustom-ProjectTeam"
        // onOk={handleShowModal}
        onCancel={handleCloseModalProjectTeam}
        footer={null}
        width={642}
        bodyStyle={{
          backgroundColor: '#232324',
        }}
      >
        <div className="modal-ProjectTeam">
          <div className="modal-container">
            <div className="modal-head">
              <h4>Project team members</h4>
            </div>
            <div className="modal-center">
              {listMember?.map((item, index) => {
                return (
                  <div className="modal-item" key={index}>
                    <div className="modal-user">
                      <Avatar style={{ backgroundColor: '#f56a00' }}>{item?.name?.slice(0, 2)}</Avatar>
                      <span className="modal-name">{item?.name}</span>
                    </div>
                    <div className="modal-action">
                      {item?.role === 'admin' && (
                        <select className="modal-select">
                          <option >Admin</option>
                        </select>
                      )}
                      <button className="btn-removelist">Remove</button>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="modal-footer">
              <form onSubmit={handleSubmitAddMember}>
                <label>Add new team members:</label>
                <input
                  type="text"
                  value={addMember}
                  name="addMember"
                  onChange={(e) => {
                    setAddMember(e.target.value)
                  }}
                  placeholder="Separate each email with a comma"></input>
                <button type='submit'>Done</button>
              </form>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        title=""
        style={{ left: "180px", top: "60px" }}
        visible={isShowModalAddTeam}
        mask={false}
        className="modalcustom-ProjectTeam"
        onCancel={handleCloseModalAddTeam}
        footer={null}
        width={642}
        bodyStyle={{
          backgroundColor: '#232324',
        }}
      >
        <div className="modal-ProjectTeam">
          <div className="modal-container">
            <div className="modal-head">
              <h4>Add team members</h4>
              <p>Invite your team members. If enabled, anyone with a verified <b>twentythridc.com</b> email domain can join the project without waiting for an invite.</p>
              <FormControlLabel
                control={<Android12Switch checked={enableDomain} onChange={handleSwitchEnableDomain} />}
                label="Enable approved domains"
              />
            </div>
            <div className="modal-copy">
              <h5>Send people this link:</h5>
              <div className="modal-link">
                <h5>{`${projectData?.name}/twentythirdc.com/auth/join-team`}</h5>
                <button onClick={handleCopyText} className="btn-yallow">Copy</button>
              </div>
            </div>
            <div className="modal-footer">
              <form onSubmit={handleSubmitAddMember}>
                <label>Invite your teammates via email:</label>
                <input type="text"
                  value={addMember}
                  onChange={(e) => {
                    setAddMember(e.target.value)
                  }}
                  placeholder="Separate each email with a comma"></input>
                <button type='submit'>Done</button>
              </form>
            </div>
          </div>
        </div>
      </Modal>




      <Modal
        title=""
        style={{ left: "180px", top: "60px" }}
        visible={isShowModalAddClient}
        mask={false}
        className="modalcustom-ProjectTeam"
        // onOk={handleShowModal}
        onCancel={handleCloseModalAddClient}
        footer={null}
        width={642}
        bodyStyle={{
          backgroundColor: '#232324',
        }}
      >
        <div className="modal-ProjectTeam">
          <div className="modal-container">
            <div className="modal-head">
              <h4> Add client admin</h4>
              <p>You can only add client admin email to invite them to the project. Client admin will be responsible to add their own team members to the project.</p>

            </div>
            <div className="modal-copy">
              <h5>Sharing link for client admin::</h5>
              <div className="modal-link">
                <h5>{`${projectData?.name}/twentythirdc.com/auth/join-team`}</h5>
                <button className="btn-yallow">Copy</button>
              </div>
            </div>
            <div className="modal-footer">
              <form onSubmit={handleSubmitClient}>
                <label>Invite client admin via email:</label>
                <div className="form-group">
                  <input type="text"
                    value={addClient}
                    onChange={(e) => {
                      setAddClient(e.target.value)
                    }}
                    placeholder="Enter client admin email"></input>
                  <button>Send</button>
                </div>

                <button type='submit'>Done</button>
              </form>
            </div>
          </div>
        </div>
      </Modal>



      <Modal
        title=""
        style={{ left: "180px", top: "60px" }}
        visible={isShowModalClientTeam}
        mask={false}
        className="modalcustom-ProjectTeam"
        // onOk={handleShowModal}
        onCancel={handleCloseModalClientTeam}
        footer={null}
        width={642}
        bodyStyle={{
          backgroundColor: '#232324',
        }}
      >
        <div className="modal-ProjectTeam">
          <div className="modal-container">
            <div className="modal-head">
              <h4>Client team members</h4>
            </div>
            <div className="modal-center">
              {listMember?.map((item, index) => {
                return (
                  <div className="modal-item" key={index}>
                    <div className="modal-user">
                      <Avatar style={{ backgroundColor: '#f56a00' }}>{item?.name?.slice(0, 2)}</Avatar>
                      <span className="modal-name">{item?.name}</span>
                    </div>
                    <div className="modal-action">
                      {item?.role === 'admin' && (
                        <button className="btn-admin">Admin</button>
                      )}
                      <button className="btn-removelist">Remove</button>
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="modal-text">If you remove client admin, this happens…</p>
            <div className="modal-footer">
              <form onSubmit={handleSubmitAddMember}>
                <label>Send note to client admin:</label>
                <input
                  type="text"
                  value={addMember}
                  name="addMember"
                  onChange={(e) => {
                    setAddMember(e.target.value)
                  }}
                  placeholder="Type your message here"></input>
                <button type='submit'>Done</button>
              </form>
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
    </div>
  );
}

export default Header;
