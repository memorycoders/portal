import React, { useState } from 'react';
import { Avatar, Comment } from 'antd';

function CommentItem(props) {
  const UserList = ['AU', 'Lucy', 'Tom', 'Edward'];
  const [user, setUser] = useState(UserList[0]);
  return (
    <div className="comment">
      <div className="comment-container">
        <Comment
          // actions={actions}
          author={<span style={{marginTop:"10px", color: "#D4DFE1" }}>My User Name - Organisation </span>}
          avatar={
            <Avatar style={{ verticalAlign: 'middle' }} size="large" >
              {user}
            </Avatar>
          }
          content={
            <p>
              03:57 Yep; totally agree with you. 100% correct.
          </p>
          }
        // datetime={
        //   <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
        //     <span>{moment().fromNow()}</span>
        //   </Tooltip>
        // }
        />
        {/* <div className="comment-info">
          <div className="comment-user">
            <Avatar style={{ verticalAlign: 'middle' }} size="large" >
              {user}
            </Avatar>
            <span style={{ marginLeft: "15px", color: "#D4DFE1" }}>My User Name - Organisation</span>
          </div>
          <div className="comment-edit">
              <span>Edit</span>
              <span>Delete</span>
          </div>
        </div>
        <div className="comment-content">
            <span>03:57 Yep; totally agree with you. 100% correct.</span>
            <span>17/11/2019 - 10:36 AM</span>
        </div> */}
      </div>
    </div>
  );
}

export default CommentItem;