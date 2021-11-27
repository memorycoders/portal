import React, { useState } from 'react';
import { Avatar ,Row,Col} from 'antd';
function HeaderRoom(props) {
  const UserList = ['AU', 'Lucy', 'Tom', 'Edward'];
  const [user, setUser] = useState(UserList[0]);
  return (
    <>
      <div className="header-room">
        <div>
          <Avatar style={{ verticalAlign: 'middle' }} size="large" >
            {user}
          </Avatar>
          <span style={{ marginLeft: "15px", color: "#00D599" }}>Username Gose Here</span><span style={{color:"#D4DFE1",marginLeft:"15px"}}>posted a video</span>
        </div>
        <div>
          <span style={{color:"#707070"}}>17/11/2019 - 10:30AM</span>
        </div>
      </div>

    </>
  );
}

export default HeaderRoom;