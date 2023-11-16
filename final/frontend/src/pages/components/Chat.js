import { Button, Card, Input } from "antd";
import React from "react";
import { Msg } from "../../api/TeacherRoomapi";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        msg:'',
        existedMsgs:[]
        
      };
      //this.getMsgsDB = this.getMsgsDB.bind(this);
  }
  componentDidMount(){
      this.getMsgsDB();
    }
  getMsgsDB =async()=>{
    const {  name } = this.props;//name is classname
    const payload = { name };
    await Msg.getMsg(payload)
      .then((res) => {
        console.log(res.data.results);
        this.setState({existedMsgs:res.data.results})
      })
      .catch((error) => {
        console.log("error get msgs",error);
        window.alert("Error Try Logout and Login");

      });
  }
  sendMsgs = async () => {

    const {  name ,username} = this.props;//name is classname
    const { msg} = this.state;
    const payload = {  name,username,msg };
    await Msg.insertMsg(payload)
      .then((res) => {
        //window.alert("succesfuly sent Msg");
        console.log(res)
        this.setState({msg:''})
      })
      .then((res)=>{
        this.getMsgsDB();
        console.log(res)
      })
      .catch((error) => {
        window.alert("Error Try Logout and Login");
        console.log(error)

      });
  };


  render() {
    const { msg, existedMsgs} = this.state;
    return (
      <div>
        <Card style={{minHeight:'300px',maxHeight:'300px',overflow:'scroll'}}>
          {
            existedMsgs.length>0?
            existedMsgs.map((eachmsg)=>{
              return (<p>{eachmsg.username + ' : ' + eachmsg.msg}</p>);
            }): "No Msgs Yet"
          }
        </Card>
        <div>
            <Input style={{float:'left',width:'90%'}} value={msg} onChange={(e)=>{this.setState({msg:e.target.value})}} placeholder="Enter Your Message" />
            <Button style={{float:'left',width:"8%",backgroundColor:"#05386B",fontWeight:'1000'}} type="primary" onClick={() => {this.sendMsgs()}}>
              Send
            </Button>
        </div>
      </div>
    );
  }
}

export default Chat;
