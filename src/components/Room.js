import React from 'react';
import LeftRoom from './LeftRoom';
import RightRoom from './RightRoom';
import { Row, Col } from 'antd';
import HeaderRoom from './HeaderRoom';
function Room(props) {
  return (
    <div className="room">
      <Row className="room-container">
        <HeaderRoom />
        <LeftRoom />
        <RightRoom />
      </Row>
    </div>
  );
}

export default Room;