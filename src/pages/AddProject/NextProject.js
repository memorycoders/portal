import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { Snackbar } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { validateEmail } from 'src/utils/Validation'

function NextProject(props) {
  const { addProjectInfor, name } = props
  const [projectName, setProjectName] = useState("");
  const [noti, setNoti] = useState({ open: false, content: '' });
  const [checked, setChecked] = useState(true)
  const handleChange = (e) => {
    e.preventDefault()
    setProjectName(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const list = projectName.split(",");
    addProjectInfor({ enableDomain: checked, email: list })
  }

  const handleClose = () => {
    setNoti({ ...noti, open: false })
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
    const text = `${name}/twentythirdc.com/auth/join-team`
    copyToClipboard(text).then(() => setNoti({ open: true, content: 'Copied!' }))
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
    <div className="next-project">
      <div className="next-container">
        <h4>Set up your project</h4>
        <h5>Invite your team members. If enabled, anyone with a verified <b>twentythridc.com</b> email domain can join the project without waiting for an invite.</h5>
        <FormControlLabel
          style={{ marginTop: "10px", marginBottom: "5px" }}
          control={<Android12Switch checked={checked} onChange={() => setChecked(!checked)} />}
          label="Enable approved domains"
        />
        <div className="next-copy">
          <h5>Send people this link:</h5>
          <div className="next-link">
            <h5>{`${name}/twentythirdc.com/auth/join-team`}</h5>
            <button onClick={handleCopyText} className="btn-yallow">Copy</button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Invite your teammates via email: </label>
          <input type="text"
            name="projectName"
            value={projectName}
            onChange={handleChange}
            placeholder="Separate each email with a comma"></input>
          <button type="submit" className={`btn-yallow`}>Next</button>
        </form>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={noti.open}
        onClose={handleClose}
        message={noti.content}
      />
    </div>

  );
}

export default NextProject;