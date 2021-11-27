import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
} from "react-router-dom";
import { PrivateRoute } from "src/components";
import {
  HomePage,
  PageLogin,
  PageNotFound,
  ListProduct,
  HandleFormPage,
  PageSignUp,
  SignUpForm2,
  PersonalInfo,
  PageForgotPass,
  VerifyEmail,
  PageResetPass,
  JoinProject
} from "./pages";

export const MyRoutes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/login" component={PageLogin} />
        <Route exact path="/user-info" component={PersonalInfo} />
        <Route exact path="/verify-email" component={VerifyEmail} />
        <Route exact path="/signup" component={PageSignUp} />
        <Route exact path="/forgot-password" component={PageForgotPass} />
        <Route exact path="/reset-password" component={PageResetPass} />
        <Route exact path="/join-project" component={JoinProject} />
        <Route path="/home" component={HomePage} />
        <Route exact path="/">
          <Redirect to="/home"/>
        </Route>
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
};
