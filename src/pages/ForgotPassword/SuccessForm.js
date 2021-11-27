import React,{useState,useEffect} from 'react';

function SuccessForm(props) {
  const {onReSend,resendSuccess} = props;

  const [disabled, setDisabled] = useState(false)
  const [count, setCount] = useState(0)
  const handleClick = () =>{
    onReSend()
    setCount(count+1)
  }

  useEffect(() => {
    if(count >= 10){
      setDisabled(true)
    }else{
      if(resendSuccess){
        setDisabled(false)
      }else{
        setDisabled(true)
      }
    }
  }, [resendSuccess,count])
  return (
    <div className="success-form">
      <div className="success-container">
          <div className="success-text">
          A password reset message was sent to your email address. Please click the link in that message to reset your password.
            If you do not the password reset message within a few moments, please check your spam folder or other filtering tools.
          </div>
          <button disabled={disabled} style={{height: "26.48px"}} onClick={handleClick} className="success-btn">Resend</button>
      </div>
    </div> 
  );
}

export default SuccessForm;