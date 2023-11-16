import React, { Component } from "react";

import { Button } from "antd";
import { Input, Space } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  KeyOutlined,
} from "@ant-design/icons";

import auth from "./auth";
import LoginApi from "../../api/LoginApi";
class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email_id: "",
      password: "",
    };
  }

  handleChangeEmailId = async (event) => {
    const email_id = event.target.value;
    this.setState({ email_id });
  };

  handleChangeInputPassword = async (event) => {
    const password = event.target.value;
    this.setState({ password });
  };

  handleIncludeEmail = async () => {
    const { email_id, password } = this.state;
    const payload = { email_id, password };
    //const payload1={email_id};
    await LoginApi.LoginID(payload)
      .then((res) => {
        //window.alert(`Login successfull`)
        this.setState({
          email_id: "",
          password: "",
        });
    
        
        auth.login(() => {
          this.props.history.push("/dashboard");
        });
        let resResult=(res.data.result);
        /*console.log(
          res.data.fullName,
          res.data.email_id,
          res.data.isTeacher
        );*/
        this.props.setData(
          resResult.fullName,resResult.email_id,resResult.isTeacher
        );
      })
      .catch((error) => {
        console.log(error);
        window.alert("Login unsuccessfull");
      })
  };

  render() {
    const { email_id, password } = this.state;

    return (
      <>
        <Space direction="vertical">
          <Input
            placeholder="Email Id"
            type="string"
            onChange={this.handleChangeEmailId}
            value={email_id}
            prefix={<UserOutlined />}
          />

          <Input.Password
            type="string"
            value={password}
            onChange={this.handleChangeInputPassword}
            placeholder="Password"
            prefix={<KeyOutlined />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <Button block={true} onClick={this.handleIncludeEmail} type="primary">
            Log In
          </Button>
          {}
        </Space>
      </>
    );
  }
}

export default LoginComponent;




/*import React, { Component } from "react";

import { Button } from "antd";

import { Input, Space } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  KeyOutlined,
} from "@ant-design/icons";

import auth from "./auth";
import LoginApi from "../../api/LoginApi";

class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email_id: "",
      password: "",
    };
  }

  handleChangeEmailId = async (event) => {
    const email_id = event.target.value;
    this.setState({ email_id });
  };

  handleChangeInputPassword = async (event) => {
    const password = event.target.value;
    this.setState({ password });
  };

  handleIncludeEmail = async () => {
    const { email_id, password } = this.state;
    const payload = { email_id, password };

    await LoginApi.LoginID(payload)
      .then((res) => {
        window.alert(`Login successfull`);
        this.setState({
          email_id: "",
          password: "",
        });
        //this.props.handleLogin();
        auth.login(() => {
          this.props.history.push("/dashboard");
        });
        console.log("Login is " + auth.isAuthemticated());
      })
      .catch((error) => {
        console.log(error);
        window.alert("Login unsuccessfull");
      });
  };

  render() {
    const { email_id, password } = this.state;

    return (
      <>
        <Space direction="vertical">
          <Input
            placeholder="Email Id"
            type="string"
            onChange={this.handleChangeEmailId}
            value={email_id}
            prefix={<UserOutlined />}
          />

          <Input.Password
            type="string"
            value={password}
            onChange={this.handleChangeInputPassword}
            placeholder="Password"
            prefix={<KeyOutlined />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <Button block={true} onClick={this.handleIncludeEmail} type="primary">
            Log In
          </Button>
          {}
        </Space>
      </>
    );
  }
}

export default LoginComponent;
*/