import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import {ProtectedRoute} from './pages/components/protectedRoute';
import Profile from "./pages/Profile";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";
import NotFound from './pages/NotFound';
import OpenedRoom from './pages/components/OpenedRoom';
import AttendTest from "./pages/components/AttendTest"
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user : false,
      username : '',
      userMail : '',
      isTeacher : false,
    };
    this.setData = this.setData.bind(this);

  }
  setData(username, userMail, isTeacher){
    this.setState({
      username,
      userMail,
      isTeacher
    },()=>{console.log(this.state.username + ' yeyeyey')})
  }
 /* handleLogin (e) {
    e.preventDefault();
    this.setState({user:true});
  }

  handleLogout (e) {
    e.preventDefault();
    this.setState({user:false});
  }
  SetIsTeacher(e) {
    e.preventDefault();
    this.setState({isTeacher:true});
  }
  ResetIsTeacher(e) {
    e.preventDefault();
    this.setState({isTeacher:false});
  }*/
  render() {
    const {user, username, userMail, isTeacher} = this.state;
    
    return (
      <div
        /*style={{
          fontFamily: 'Monospace',
          fontWeight:700

        }}*/
      >
          <Router>
          <Switch>
              <Route exact path='/' render={
                props => <Login {...props} setData={this.setData} user={user.toString()} username={this.username}  />} />
              <ProtectedRoute exact path='/dashboard' component={DashBoard} username={username} userMail={userMail} isTeacher={isTeacher} />
              <ProtectedRoute exact path='/profile' component={Profile} username={username} userMail={userMail} isTeacher={isTeacher}  />
              <ProtectedRoute exact path='/createRoom' component={CreateRoom} username={username} userMail={userMail} isTeacher={isTeacher}  />
              <ProtectedRoute exact path='/joinRoom' component={JoinRoom} username={username} userMail={userMail} isTeacher={isTeacher}  />
              
              <Route exact path='/dashboard/:id' component={OpenedRoom} />
              <Route exact path={`/dashboard/:id/ok`} component={AttendTest} />
              <Route exact path={`/dashboard/:id/:id`} component={AttendTest} />

              <Route path='*' component={NotFound} /> 
          </Switch>
          </Router>
      </div>
    );
  }
}

export default App;
/*
handleLogout={this.handleLogout} component={Main} render={
              props => <Main  {...props} 
}
/>
*/