import React from "react";
import { Redirect, Route } from "react-router-dom";

import auth from "./auth";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const username=rest.username ,userMail=rest.userMail, isTeacher=rest.isTeacher;
  console.log("protocted rute"+username+userMail+isTeacher)
  let r = {...rest} 
   r = JSON.stringify(r)
  return (
    <Route
      {...rest}
      render={(props) => {
        if(auth.isAuthemticated()){
            console.log("protocted rute"+username+userMail+isTeacher+r)
            return <Component r={r}  username={username} userMail={userMail} isTeacher={isTeacher} {...props} {...rest} />;
        }  
        else{
            return <Redirect to={
                {
                    pathname:'/',
                    state:props.location
                }
            } />
        }
      }}
    />
  );
};




/*import React from "react";
import { Redirect, Route } from "react-router-dom";

import auth from "./auth";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if(auth.isAuthemticated()){
            return <Component {...props} />;
        }  
        else{
            return <Redirect to={
                {
                    pathname:'/',
                    state:props.location
                }
            } />
        }
      }}
    />
  );
};*/
