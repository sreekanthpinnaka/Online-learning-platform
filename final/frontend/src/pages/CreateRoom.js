import React, { Component } from "react";
import { Button, Card, Input } from "antd";
import { createRoomApi } from "../../src/api/LoginApi";

class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      userMail: props.userMail,
      teacherName: props.username,
      descr: "",
    };
  }
  handleChangeName = async (event) => {
    const name = event.target.value;
    this.setState({ name });
  };
  handleChangedescr = async (event) => {
    const descr = event.target.value;
    this.setState({ descr });
  };

  handleaftera = async () => {
    const { name, } = this.state;
    //const payload = { name, userMail, descr, teacherName };
    const payload1 = { name };

    await createRoomApi
      .getdesc(payload1)
      .then((res) => {
        //window.alert(`Class created successfully`);
        console.log("Descr GOT Successfully!!");
        console.log(res.data);
        this.setState(
          {
            name: "",
            descr:""
          },
          () => {
            console.log("Hurray!");
          }
        );
      })
      .catch((error) => {
        window.alert(`couldnt get desc`);
        console.log(error)
      });
  };

  handleafter = async () => {
    const { name, userMail, descr, teacherName } = this.state;
    const payload = { name, userMail, descr, teacherName };
    //const payload1 = { name };

    await createRoomApi
      .createdRoomdesc(payload)
      .then((res) => {
        //window.alert(`Class created successfully`);
        console.log("Descr addedd Successfully!!");
        console.log(res);
        this.handleaftera();
      })
      .catch((error) => {
        window.alert(`Please login and logout`);
        console.log(error);
      });
  };
  handleSubmit = async () => {
    const { name,userMail} = this.state;
    const payload = { name,userMail };
    const payload1 = { name };
    var count = 0;
    await createRoomApi
      .createError(payload1)
      .then((res) => {
        count = 1;
      })
      .catch((error) => {
        count = 0;
        window.alert("Room already exists");
      });
    if (count === 1) {
      await createRoomApi
        .createRoom(payload)
        .then((res) => {
          window.alert(`Class created successfully`);
         
        })
        .then(()=>{
          this.handleafter();
        })
        .catch((error) => {
          window.alert(`Please Enter Valid Data`);
        });
    }
    count = 0;
    //this.handleafter();
  };

  render() {
    const { name,  descr } = this.state;
    //console.log(teacherName)
    return (
      <div style={{ textAlign: "center" }}>
        {
          //<h1>Create a Room Here </h1>
        }

        <Button
          type="secondary"
          style={{ margin: "15px" }}
          onClick={() => {
            this.props.history.push("/dashboard");
          }}
        >
          {" "}
          Back
        </Button>
        <Card
          title="Create a Room"
          style={{ left: "40%", textAlign: "center", width: 300 }}
        >
          <Input
            placeholder="Name of the room"
            value={name}
            onChange={(e) => {
              this.handleChangeName(e);
            }}
            style={{ marginTop: "10px" }}
          />
          <Input
            placeholder="Description"
            value={descr}
            onChange={(e) => {
              this.handleChangedescr(e);
            }}
            style={{ marginTop: "10px" }}
          />

          <Button
            type="primary"
            onClick={() => {
              console.log("Clicked Create");
              this.handleSubmit();
            }}
            style={{ marginTop: "10px" }}
          >
            {" "}
            Create{" "}
          </Button>
        </Card>
      </div>
    );
  }
}

export default CreateRoom;
