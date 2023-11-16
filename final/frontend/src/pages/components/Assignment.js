import React, { Component } from "react";

import { Row, Col, Card, Button } from "antd";
import Assignment from "../../api/TeacherRoomapi";
import { Input } from "antd";

const { TextArea } = Input;

export class Asssignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignment: "",
      name: this.props.name,
      isTeacher: this.props.isTeacher,
      sharedAssignments: [],
      gotit: false,
      studentInput:'',
      tempq:'',
      alreadySubmittedAssign:[],
      alreadySubmittedAssignNames:[]
    };
    this.getAssignmentFromDB = this.getAssignmentFromDB.bind(this);
  }
  static propTypes = {};
  studentSubmit= async (tempq) => {
    const { studentInput, name } = this.state;
    console.log(tempq)
    if(studentInput === ''){
      window.alert("Enter something to post");
      return
    }
    const { username } = this.props;
    const payload = {  name,tempq, username, studentInput };
    await Assignment.insertStudentAssignmentWork(payload)
      .then((res) => {
        window.alert("assignment submitted by student");
      })
      .then(() => {
        this.setState({ studentInput: "",tempq:'' });
        this.getStudAssignFromDB();
      })
      .catch((err) => {
        window.alert("Error Try Logout and Login");
        console.log(err);
      });
  };

  getStudAssignFromDB = async () => {
    const { name } = this.state;
    const payload = { name };
    await Assignment.getStudentAssignmentWork(payload)
      .then((res) => {
        console.log("assignment student got db");
        let tempdatafromdb = res.data.results.map((e)=>{return e.tempq})
        let tnamedb = res.data.results.map((e)=>{return e.username})
        console.log(res.data.results);
        this.setState({ alreadySubmittedAssign: tempdatafromdb, alreadySubmittedAssignNames:tnamedb});
        //console.log(res)
      })
      .catch((err) => {
        console.error("Error", err);
      });
  };
  getAssignmentFromDB = async () => {
    const { name } = this.state;
    const payload = { name };
    await Assignment.getAssignment(payload)
      .then((res) => {
        console.log("assignment got");
        console.log(res.data.results);
        this.setState({ sharedAssignments: res.data.results });
        //console.log(res)
      })
      .catch((err) => {
        console.error("Error", err);
      });
  };
  handleAssignment = async () => {
    const { assignment, name } = this.state;
    const payload = { assignment, name };
    await Assignment.insertAssignment(payload)
      .then((res) => {
        window.alert("assignment submitted");
      })
      .then(() => {
        this.setState({ assignment: "" });
        this.getAssignmentFromDB();
      })
      .catch((err) => {
        window.alert("Error Try Logout and Login");
        console.log(err);
      });
  };
  componentDidMount() {
    this.getAssignmentFromDB();
    this.getStudAssignFromDB();
  }
  render() {
    const { assignment, isTeacher, sharedAssignments, studentInput } = this.state;
    const { username } = this.props;
    if (isTeacher === "true") {
      return (
        <div>
          <Row>
            <Col span={8}>
              <Card>
                <Card title="Create New Assignment">
                  <TextArea
                    rows={6}
                    value={assignment}
                    onChange={(e) => {
                      this.setState({ assignment: e.target.value });
                    }}
                  />
                  <Button
                    type="primary"
                    style={{ marginTop: "10px" }}
                    onClick={this.handleAssignment}
                  >
                    Create Assignment
                  </Button>
                </Card>
              </Card>
            </Col>
            <Col span={16}>
              <Card>
                <Card title="Created Assignments">
                  {sharedAssignments.length !== 0
                    ? sharedAssignments.map((a, i) => {
                        return <Card key={i}>{a.assignment}</Card>;
                      })
                    : "No Data"}
                </Card>
              </Card>
            </Col>
          </Row>
        </div>
      );
    } else {
      return (
        <div>
          <Card>
            <Card title="Created Assignments">
              {sharedAssignments.length !== 0
                ? sharedAssignments.map((a, i) => {
                  let temppp = a.assignment
                  console.log(temppp)
                  if(this.state.alreadySubmittedAssign.includes(temppp) && this.state.alreadySubmittedAssignNames.includes(username)){
                    return (
                      <Card key={i}>
                        {a.assignment}<br/>
                        <b><i>Awesome!!! You have already submitted this assignment</i></b>
                      </Card>
                    );
                  }
                    return (
                      <Card key={i}>
                        {a.assignment}
                        <Input value={studentInput} onChange={(e,temppp)=>{
                                this.setState({studentInput:e.target.value})

                        }}placeholder="Paste your link for this Asssignment" />
                        <Button type="primary" value={temppp} onClick={()=>{this.studentSubmit(temppp)}}>Submit</Button>
                      </Card>
                    );
                  })
                : "No Data"}
            </Card>
          </Card>
        </div>
      );
    }
  }
}

export default Asssignment;
