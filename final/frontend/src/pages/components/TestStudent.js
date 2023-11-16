import React from "react";
import { TestApi } from "../../api/TeacherRoomapi";
//import { Card } from "antd";
import { withRouter } from "react-router";

import AttendTest from './AttendTest';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import {  Button, Collapse } from "antd";
const { Panel } = Collapse;




class TestStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testsfromdb: [],
      value: 0,
      count:0,
      answers:[],
      resultsofTests:[],

    };
    //let value = 1;
  }
  onChange = e => {
    console.log('radio checked', e.target.value);
  };
  getTestfromdb = async () => {
    const { name } = this.props;
    //const { test } = this.state;
    const payload = { name };
    await TestApi.getTests(payload)
      .then((res) => {
        console.log(res.data.results);
        this.setState({ testsfromdb: res.data.results });
        console.log("Got tests");
      })
      .then(() => {
        //this.getNotesFromDB();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getsubmitTestsfromDB = async () => {
    //const {marks,value,complete} = this.state;
    //const {userName,tests,roomName} = this.props.location.state.params;

    //console.log("Submit btn hit")
    //let testName = tests.name
    const { name,username } = this.props;
    let roomName = name;
    const payload = { roomName,};
    await TestApi.getsubmitTests(payload)
      .then((res) => {
        //window.alert("succesfuly got submitted test data");
        let temp_res = res.data.results.map((e)=>{
          return (e.userName === username ?  e.testName : null)
        })
        this.setState({resultsofTests:temp_res})
        console.log(res.data.results)
      })
      .catch((error) => {
        window.alert("Error Try Logout and Login");
        console.log(error)

      });
  };
  componentDidMount() {
    this.getTestfromdb();
    this.getsubmitTestsfromDB();
  }
  render() {

    console.log(this.props)
    const { testsfromdb,resultsofTests } = this.state;
    const prevurl = this.props.match.url;
    const {name,username} = this.props;
    console.log("name")
    console.log(resultsofTests)
    console.log(resultsofTests)
    return (
      <div>
        <Router>
              <Switch>
                <Route exact path={`/dashboard/${name}/:id`} component={AttendTest} />
              </Switch>
        </Router>
        {/*

            <Card hoverable style={{ backgroundColor: "lightblue" }}>
            <p>{count+1}/{testsfromdb.length}</p>
            <Radio.Group onChange={(e)=>{}} value={value}>
              <Space direction="vertical">
                  <Radio value={1}>{"a."}{testsfromdb[count]}</Radio>
                  <Radio value={2}>{"b."}{testsfromdb[count]}</Radio>
                  <Radio value={3}>{"c."}{testsfromdb[count]}</Radio>
                  <Radio value={4}>{"d."}{testsfromdb[count]}</Radio>
              </Space>
            </Radio.Group>  
              <Button onClick={()=>{this.setState({value:value,count:count+1})}}>next</Button>
            </Card>

        */}
        {testsfromdb.map((each, index) => {
          if(this.state.resultsofTests.includes(each.name)){
            return(

            <Collapse>
            <Panel header={each.name} key={index}>
                <b><i>Awesome!!! You have already finished this test...</i></b>
            </Panel>
          </Collapse>
            )
          }
          return (
            <div>
            

            <Collapse>
              <Panel header={each.name} key={index}>
              <Link
                    to={{
                      pathname: `${prevurl}/${each.name}`,
                      state: {
                        params: {
                          tests:each,
                          roomName:name,
                          userName:username
                        },
                      },
                    }} 
                  >
                <Button>Attend Test</Button>
                    </Link>
                
              </Panel>
            </Collapse>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withRouter(TestStudent);
/*
<p>
                  {each.qs.map((q,i) => {
                    return (
                      <div>
                        <Card hoverable style={{ backgroundColor: "wheat" }}>
                            <p>{i+1}{"."}{q.questionname}</p>
                            <Radio.Group onChange={(e)=>{value=e.target.value;console.log(value)}} value={value}>
                            <Space direction="vertical">
                                <Radio value={1}>{"a."}{q.options.a}</Radio>
                                <Radio value={2}>{"b."}{q.options.b}</Radio>
                                <Radio value={3}>{"c."}{q.options.c}</Radio>
                                <Radio value={4}>{"d."}{q.options.d}</Radio>
                            </Space>
                            </Radio.Group>  

                        </Card>
                      </div>
                    );
                  })}
                </p>
                <p><Button>Submit Test</Button></p>
*/
/*

<p>
                  Test Name : <b>{each.name}</b>
                </p>
                <p>
                  Total Number of Questions: <b>{each.nq}</b>
                </p>
                <p>
                  <b><i>Make Sure You answer all the questions before hitting submit!!!</i></b>
                </p>{" "}
*/