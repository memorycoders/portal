import React from 'react';

function TopBar(props) {
  return (
    <div className="topbar">
      <div className="topbar-container">
        <ul className="topbar-left">
          <li><a className="active btn-active">Feed</a></li>
          <li><a>Images</a></li>
          <li><a>Videos</a></li>
        </ul>
        <ul className="topbar-right">
          <li><a className="active">Quick access:</a></li>
          <li><a>Pinned</a></li>
          <li><a>Gallery</a></li>
          <li><a>Files</a></li>
        </ul>
      </div>
    </div>
  );
}

export default TopBar;