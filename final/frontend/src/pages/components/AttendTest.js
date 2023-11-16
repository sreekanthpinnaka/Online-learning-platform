import React from 'react';
import "../styles/AttendTest.css";
import { Card, Radio, Space } from 'antd';
//import { useHistory } from "react-router-dom";

import {TestApi} from '../../api/TeacherRoomapi';


class AttendTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            complete:false,
            count:0,
            marks:0,
            value:"",
        };
    }
    getsubmitTestsfromDB = async () => {
        const {roomName} = this.props.location.state.params;
        const payload = { roomName,};
        await TestApi.getsubmitTests(payload)
          .then((res) => {
            window.alert("succesfuly got submitted test data");
          })
          .catch((error) => {
            window.alert("Error Try Logout and Login");
            console.log(error)
          });
      };
    submitTest = async () => {
        const {marks,} = this.state;
        const {userName,tests,roomName} = this.props.location.state.params;

        console.log("Submit btn hit")
        console.log(TestApi)

        let testName = tests.name
        const payload = { roomName, userName , testName, marks };
        await TestApi.submitTests(payload)
          .then((res) => {
            window.alert("succesfuly submitted test");
            console.log(res)
          })
          .then(()=>{
            //this.getsubmitTestsfromDB()
          })
          .catch((error) => {
            window.alert("Error Try Logout and Login");
            console.log(error)
    
          });
      };
    nextQ = () =>{
        const {count,marks,value} = this.state;
        const {tests} = this.props.location.state.params;

        if(value === tests.qs[count].answer){
            this.setState({marks:marks+1})
        }
        if(count===tests.qs.length-1){
            this.submitTest()
            this.setState({complete:true})
        }else{
            this.setState({count:count+1})
        }
    }
    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
      };
    render() {
        const {userName,tests,} = this.props.location.state.params;
        const {count,marks,value,complete} = this.state;
        if(!complete){
        return (
            <div style={{backgroundColor:'#5CDB95',height:'650px'}}>
                
                <>
                    <Card style={{
                        float:"left",backgroundColor:"#05386B",
                        color:'white',width:"500px",
                        textAlign:"center",
                        top:"160px",
                        left:"30%",
                        borderRadius: '5%',
                        fontFamily: 'Comfortaa',
                    }}>
                    <h1><b  style={{color:'white'}}>Welcome {userName}</b></h1>
					<div className='question-section'>
                        <h2 style={{color:'white'}}>{tests.name}</h2>
						<div className=''>
							<h2 style={{color:'white'}}>Question {count + 1}/{tests.qs.length}</h2>
						</div>
						<div className='question-text'><b>{tests.qs[count].questionname}</b></div>
					</div>
					<div >
                    <Radio.Group onChange={this.onChange} value={value}>
                    <Space direction="vertical">
                        <Radio style={{color:'white'}} value={"a"}><b>{tests.qs[count].options.a}</b></Radio>
                        <Radio style={{color:'white'}} value={"b"}><b>{tests.qs[count].options.b}</b></Radio>
                        <Radio style={{color:'white'}} value={"c"}><b>{tests.qs[count].options.c}</b></Radio>
                        <Radio style={{color:'white'}} value={"d"}><b>{tests.qs[count].options.d}</b></Radio>
                    </Space></Radio.Group>

							<button style={{marginLeft:"33%",marginTop:"5%"}} onClick={this.nextQ}>{count===tests.qs.length-1?"Submit":"Next Question"}</button>
					</div>
                    </Card>
				</>
            </div>
        );
        }else{
            return(<div>
                <button onClick={()=>{this.props.history.goBack();}}> Back </button>
                Completed Test , You Scored {marks}</div>);
        }
    }
}


export default AttendTest;
