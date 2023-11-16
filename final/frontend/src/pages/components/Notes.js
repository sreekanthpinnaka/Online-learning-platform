import React, { Component } from "react";
import { Note } from "../../api/TeacherRoomapi";
import { Row, Col, Card, Button } from "antd";

import { Input } from "antd";

const { TextArea } = Input;

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: "",
      name: this.props.name,
      isTeacher: this.props.isTeacher,
      sharedNotes:[],
    };
    this.getNotesFromDB = this.getNotesFromDB.bind(this)
  }
  static propTypes = {};
  getNotesFromDB =async()=>{
    const { name } = this.state;
    const payload = { name };
    await Note.getNotes(payload)
      .then((res) => {
        //console.log(res.data.results);
        this.setState({sharedNotes:res.data.results})
      })
      .catch((error) => {
        console.log("error get notes",error);

      });
  }
  handleNotes = async () => {
    const { note, name } = this.state;
    const payload = { note, name };
    await Note.insertNotes(payload)
      .then((res) => {
        window.alert("succesfuly created new notes");
      })
      .then(()=>{
        this.setState({note:''});
        this.getNotesFromDB();
      })
      .catch((error) => {
        window.alert("Error Try Logout and Login");
        console.log(error)

      });
  };
  componentDidMount(){
    this.getNotesFromDB();
  }
  render() {
    const { note, isTeacher, sharedNotes } = this.state;
    if (isTeacher === "true") {
      return (
        <div>
          <Row>
            <Col span={8}>
              <Card>
                <Card title="Create New Notes">
                  <TextArea
                    rows={6}
                    value={note}
                    onChange={(e) => {
                      this.setState({ note: e.target.value });
                    }}
                  />
                  <Button
                    type="primary"
                    style={{ marginTop: "10px" }}
                    onClick={this.handleNotes}
                  >
                    Share Notes
                  </Button>
                </Card>
              </Card>
            </Col>
            <Col span={16}>
              <Card>
                <Card title="Already Shared Notes" style={{backgroundColor:'grey',textAlign:'center'}}>
                  {sharedNotes.length!==0?sharedNotes.map((s)=>{
                      return (<Card style={{marginBottom:'20px',backgroundColor:'gainsboro'}}>{s.note}</Card>)
                  }):"No Data"}
                </Card>
              </Card>
            </Col>
          </Row>
        </div>
      );
    } else {
      return (
        <div>
          {" "}
          <Card>
            <Card title="Already Shared Notes" style={{textAlign:'center'}}>
            {sharedNotes.length!==0?sharedNotes.map((s)=>{
                      return (<Card style={{marginBottom:'20px',backgroundColor:'gainsboro'}}>{s.note}</Card>)
                  }):"No Data"}
            </Card>
          </Card>
        </div>
      );
    }
  }
}

export default Notes;
