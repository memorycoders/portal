import React, { useState, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Avatar } from 'antd';
import { useLocation } from "react-router-dom";
import { apiGetListFeed } from "src/apis";
import moment from 'moment'
import { Snackbar } from '@mui/material';
function Feed(props) {
  const [noti, setNoti] = useState({ open: false, content: '' });
  const [feedList, setFeedList] = useState([])
  const location = useLocation();
  const projectId = location?.state?.project_id || localStorage.getItem('new_project_id') || '';
  useEffect(() => {
    apiGetListFeed(projectId).then(res => {
      if (res.status === '00') {
        setFeedList(res.data && res.data.feeds.feeds)
      } else {
        setNoti({ open: true, content: 'Problem processing request! Please try again.' })
      }
    })
  }, [projectId])

  const handleClose = () => {
    setNoti({ ...noti, open: false })
  }


  return (
    <>
      <div className="nextChat">
        <div className="nextChat-container">
          <div className="nextChat-content">
            {
              feedList?.map((item, index) => {
                return (
                  <div className="nextChat-item" key={item._id}>
                    <div className="nextChat-info">
                      <div className="nextChat-avatar">
                        <Avatar size={25} style={{ backgroundColor: '#f56a00', fontSize: "10.165px", color: "#D3DEE0" }}>{item?.author?.firstName?.slice(0, 2)}</Avatar>
                      </div>
                      <div className="nextChat-user">
                        <span className="nextChat-name">{`${item?.author?.firstName} ${item?.author?.lastName}`}</span>
                        <span className="nextChat-desc">{item.title}</span>
                        <p className="nextChat-time">{moment(item?.createdAt).format('DD/MM/YYYY HH:mm A')}</p>
                      </div>
                    </div>
                    <div className="nextChat-reply">Reply</div>
                  </div>
                )
              })
            }


          </div>
          <div className="nextChat-input">
            <form>
              <div className="form-group">
                <textarea type="text" placeholder="Type something…">
                </textarea >
                <div className="form-btn">
                  <AddBoxIcon style={{ cursor: "pointer" }} sx={{ color: "#D3DEE0", width: "11.77px", height: "11.77px" }} />
                  <span></span>
                  <SendIcon style={{ cursor: "pointer" }} sx={{ color: "#D3DEE0", width: "11.77px", height: "11.77px" }} />
                </div>
              </div>
            </form>
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
}

export default Feed;