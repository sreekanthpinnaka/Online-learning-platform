import React from "react";
import { Card, Button } from "antd";
import {
  Link,
} from "react-router-dom";
import { withRouter } from "react-router";

//import OpenedRoom from "./OpenedRoom";
import { createRoomApi } from "../../api/LoginApi";

import { getRoomApi } from "../../api/LoginApi";

class RoomContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomObjects: [],
      show: false,
      isTeacher: props.isTeacher,
    };
    this.getData = this.getData.bind(this);
  }
  getData = async () => {
    const res = await getRoomApi
      .getRooms({ userMail: this.props.userMail })
      .then((resp) => {
        console.log("resp");
        console.log(resp.data.results);
        this.setState({ roomObjects: resp.data.results });
      });
      console.log(res)
  };


  
/*
  handleaftera = async (name) => {
    const payload1 = { name };
    return await createRoomApi
      .getdesc(payload1)
      .then((res) => {
        console.log("Descr GOT Successfully!!");
        console.log(res.data.results);
        
      })
      .catch((error) => {
        console.log(error)
      });
  };*/



  render() {
    const prevurl = this.props.match.url;
    //const prevurl = "http://localhost:3000/dashboard";
    const username = this.props.username;
    const data = this.state.roomObjects;
    const isTeacher = this.state.isTeacher;
    console.log("lasad");
    console.log(isTeacher);

    return (
      <div>
        <Button
          onClick={() => {
            this.setState({ show: !this.state.show });
            this.getData();
          }}
        >
          {this.state.show ? "Hide" : "Show"}
        </Button>
        {this.state.show ? (
          data.length !== 0 ? (
            data.map((currentValue, index) => {


/*
              (async (name) => {
                console.log(this.handleaftera(name))
              })(currentValue.name)*/
             




              return (
                <div>
                  <Link
                    to={{
                      pathname: `${prevurl}/${currentValue.name}`,
                      state: {
                        params: {
                          isTeacher: isTeacher,
                          classdescr: currentValue.descr,
                          teacherName: currentValue.teacherName,
                          username:username,
                        },
                      },
                    }} /*desc={val.description} tchr={val.teacherName}*/
                  >
                    <Card
                      hoverable
                      title={`${currentValue.name}`}
                      style={{ width: 300, margin: "10px" }}
                      key={index}
                    >
                      <p>
                        <i>{currentValue.descr}</i>
                      </p>
                      {isTeacher ? "" : <p>{currentValue.teacherName}</p>}
                    </Card>
                  </Link>
                </div>
              );
            })
          ) : (
            <div>No Rooms Found ...Please Join a Room</div>
          )
        ) : (
          <div>Click Show Button to show study rooms</div>
        )}
      </div>
    );
  }
}

export default withRouter(RoomContent);
