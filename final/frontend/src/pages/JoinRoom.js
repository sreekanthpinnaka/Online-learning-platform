import React,{Component} from 'react';
import { Button, Card,Input  } from 'antd';
import {getRoomApi} from '../api/LoginApi'

class JoinRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name : '',
        userMail:props.userMail,
        username:props.username,


    };
  }
  handleChangeName = async (event) => {
    const name = event.target.value;
    this.setState({ name });
  };

  handleSubmit = async () => {
    const { name , userMail,username} = this.state;
    const payload =  {username,userMail,name };
    const payload1={name,userMail}
    const payload0={name};
    if(name==='' || userMail===undefined || userMail==='' || username===undefined || username===''){
      window.alert(`Relogin to enter`);

    }
    var count=0;
    await getRoomApi.joinError(payload0).then((res)=>{
      count=1;
    }).catch((error)=>{
      window.alert('Room does not exist');

    });
    if(count===1){
    await getRoomApi.joinRoom(payload)
      .then((res) => {
        window.alert(`Class joined successfully`);
        this.setState({
          
          name:'',
          
        });
      })
      .catch((error) => {
        window.alert(`Please Enter Valid Data or Relogin`);
      });
      await getRoomApi.joinRoom1(payload1).then((res)=> {
        window.alert("insertes");
      }).catch((error)=> {

      });
    }
    count=0;
  };
  render() {
      const {name} = this.state;
    return (
      <div style={{textAlign:"center"}}>
          {//<h1>Create a Room Here </h1>

          }
          
          <Button type='secondary' style={{'margin':'15px'}}
            onClick={()=>{this.props.history.push('/dashboard');}}> Back</Button>
          <Card title="Join a Room"  style={{ left:'40%',textAlign:'center' ,width: 300 }}>
          <Input placeholder="Name of the room" value={name} onChange={(e)=>{this.handleChangeName(e)}} style={{marginTop:'10px'}} />
          {//<Input placeholder="Basic usage" style={{marginTop:'10px'}}/>
          }
          <Button type='primary' onClick={()=>{console.log("Join");this.handleSubmit()}} style={{marginTop:'20px'}}> Join </Button>
          </Card>
       </div>
    );
  }
}

export default JoinRoom;
