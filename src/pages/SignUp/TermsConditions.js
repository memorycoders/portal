import * as React from "react";
import { Button } from "@mui/material";

export default function TermsConditions(props) {
  const {signUpInfor} = props;

  function handleSubmit(event) {
    event.preventDefault();
    signUpInfor({});
  }

  return (
    <form className="login-form"  onSubmit={handleSubmit}>
      <div className="signup-label-terms">Terms & Conditions</div>
      <div className="signup-container-terms">
        <div className="signup-text-terms">
          <div className="signup-title-terms">
            Our terms, between you and us:
          </div>
          <br/>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          Duis autem vel eum iriure dolor in andrerit in vulputate velit esse
          molestie onsequat, vel illum dolore eu feugiat nulla facilisis...
        </div>
      </div>
      <Button className="login-btn" variant="contained"  style={{ height: "26.48px" }} type="submit">
        Accept
      </Button>
    </form>
  );
}
