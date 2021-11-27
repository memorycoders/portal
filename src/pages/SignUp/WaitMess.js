import React, { useState, useEffect } from 'react';

function WaitMess(props) {
  return (
    <div className="success-form">
      <div className="success-container">
        <div className="success-text">
          An account activation message was sent to your email address. Please click the link in that message to activate your account.
          If you do not the password reset message within a few moments, please check your spam folder or other filtering tools.
        </div>
      </div>
    </div>
  );
}

export default WaitMess;