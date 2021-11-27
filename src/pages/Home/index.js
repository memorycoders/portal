import React from 'react';
import SideBar from 'src/components/SideBar';
import Header from 'src/components/Header';
import TopBar from 'src/components/TopBar';
import Feed from 'src/components/Feed';
import PageAddProject from '../AddProject';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
} from "react-router-dom";
import { PageNotFound } from '..';
const HomePage = (props) => {
  return (
    <div className="home">
      <div className="home-container">
        <div className="home-left" style={{width: "164.24px"}}>
          <SideBar />
        </div>
        <div className="home-right">
          <div className="right-container">
            <Switch>
              <Route exact path="/home">
                <Header isSelectedProject={false}/>
                <PageAddProject />
              </Route>
              <Route exact path="/home/project">
                <Header isSelectedProject={true}/>
                <TopBar/>
                <Feed/>
              </Route>
              <Route>
                <PageNotFound/>
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;