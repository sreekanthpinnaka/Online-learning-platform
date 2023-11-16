import React from "react";
//import PropTypes from "prop-types";

import { Card } from "antd";

import SignUp from "./components/SignUp";
import LoginComponent from "./components/LoginComponent";
import "./styles/Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "Login",
    };
  }
  setActive() {
    console.log("Hellllo");

    let set = this.state.active === "Login" ? "Sign Up" : "Login";
    console.log(set);
    this.setState({ active: set });

    console.log(this.state.active);
  }

  render() {
    return (
      <div style={{backgroundColor:'#001529'}}>
        <div style={{textAlign:"center"}}>
          <Card
            title={this.state.active}
            style={{ width: 300, margin:'auto', top:"140px" ,border:'2px solid black'}}
          >
            {this.state.active === "Sign Up" ? (
              <div>
                <SignUp
                  {...this.props}
                  setActive={this.setActive}
                  active={this.state.active}
                />
              </div>
            ) : (
              <LoginComponent
                {...this.props}
                setActive={this.setActive}
                active={this.state.active}
              />
            )}

            <br />
            {this.state.active === "Login" ? (
              <div style={{ marginTop: "10px" }}>
                Not have an account?{" "}
                <span
                  className="signUp"
                  onClick={() => {
                    this.setState({ active: "Sign Up" });
                  }}
                >
                  {" "}
                  Sign Up
                </span>
              </div>
            ) : (
              <div style={{ marginTop: "10px" }}>
                Already have an account?{" "}
                <span
                  className="signUp"
                  onClick={() => {
                    this.setState({ active: "Login" });
                  }}
                >
                  {" "}
                  Login
                </span>
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  }
}

//Login.propTypes = {};

export default Login;
