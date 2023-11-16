import React,{Component} from 'react';
import {Card,Button } from 'antd';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username : this.props.username,
        userMail : props.userMail,
        isTeacher : props.isTeacher,  
        
    };
  }
  componentDidMount(){
    console.log("Profile page props are "+JSON.stringify(this.props))
  }
  render() {
      const {username, userMail} = this.state;
    return (
      <div>
        <div  style={{flaot:'left',paddingLeft:'30%',paddingTop:'50px',backgroundColor:'#5CDB95',height:'650px'}} >
          <Button type='secondary' style={{'margin':'15px',}}
            onClick={()=>{this.props.history.push('/dashboard');}}> Back</Button>
          <Card title={<h2 style={{color:'white'}}>User Profile</h2>} style={{ width: 500,backgroundColor:"#05386B" }}>
            <div></div>
            <h3 style={{color:'white'}}>You Mail ID is  {userMail}</h3>
            <h3 style={{color:'white'}}>Fullname is {username} </h3>
            <h3 style={{color:'white'}}>You are a {this.props.isTeacher?'teacher':'student'}</h3>
            

          </Card>
        </div>
      </div>
    );
  }
}

export default Profile;
/*extra={<a href="#">Edit</a>}  */