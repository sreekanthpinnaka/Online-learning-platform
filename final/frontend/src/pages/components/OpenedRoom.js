import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { Tabs,  Card } from "antd";

import Test from "./Test";
import Mates from "./Mates";
import Notes from "./Notes";
import Assignment from "./Assignment";
import TestStudent from "./TestStudent";
import Chat from "./Chat";

import { createRoomApi } from "../../api/LoginApi";
import DelRoom from "./DelRoom";



const { TabPane } = Tabs;

class OpenedRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classdesc:[]
    };
  }
  
  handleaftera = async (name) => {
    const payload1 = { name };
    return await createRoomApi
      .getdesc(payload1)
      .then((res) => {
        console.log("Descr GOT Successfully!!");
        console.log(res.data.results);
        this.setState({
          classdesc:res.data.results
        })
      })
      .catch((error) => {
        console.log(error)
      });
  };

  componentDidMount() {
    const { id, } = this.props.match.params;
    this.handleaftera(id)
    //console.log(this.state.classdesc)
  }
  render() {
    const { id, } = this.props.match.params;
    const { classdesc, } = this.state;
    const {isTeacher,classdescr,teacherName,username} = this.props.location.state.params;
    const name = id;
    let tp = classdesc[0];
    //console.log(this.state.isTeacher);
    return (
      <div style={{backgroundColor:'#5CDB95',minHeight:'800px'}}>
        <div style={{ padding: "2%" }}>
          <Link to="/dashboard">
            <Button type="primary"> Back To Home</Button>
          </Link>
        </div>
        <Card
          title={
            <div>
              <div>
                <h1 style={{ textAlign: "center",textTransform:'capitalize',color:"white" }}>
                  {/*`Welcome to : ${id} room `*/ id}
                </h1>
              </div>
              <div style={{ textAlign: "center"}}>
              {isTeacher?<DelRoom />:""
              }
              </div>
              <div style={{ textAlign: "center",color:'white' }}> <b>{tp?'Description : '+tp.descr:''}</b></div>
              
              {isTeacher?"":

                <div style={{ textAlign: "center",color:'white' }}><i>Created By : {tp?tp.teacherName:'Teacher'}</i></div>
              }
            </div>
          }
          style={{ margin: "2%" ,backgroundColor:'#05386B',color:'white'}}
        >
          <Tabs defaultActiveKey="1" type="card" /*style={{backgroundColor:'#cdd3d4'}}*/centered={true} size={"large"}>
            <TabPane tab="Assignment" key="1">
              <Assignment name={name} isTeacher={isTeacher}username={username}  />
            </TabPane>
            <TabPane tab="Notes" key="2">
              <Notes name={name} isTeacher={isTeacher} />
            </TabPane>
            <TabPane tab="Chat" key="3">
              <Chat name={name} username={username} isTeacher={isTeacher} />
            </TabPane>
            <TabPane tab="Mates" key="4">
              <Mates name={name} isTeacher={isTeacher}/>
            </TabPane>
            <TabPane tab="Tests" key="5">
              <Card hoverable style={{textAlign:'center',marginBottom:'10px'}}><h2>Tests for {id}</h2></Card>
              <Card>
                  {isTeacher==='true'?
                    <Test name={name} isTeacher={isTeacher} username={username}/>
                  :
                    <TestStudent name={name} isTeacher={isTeacher} username={username}/>
                  }
              </Card>
            </TabPane>
          </Tabs>
        </Card>
      </div>
    );
  }
}

export default withRouter(OpenedRoom);
