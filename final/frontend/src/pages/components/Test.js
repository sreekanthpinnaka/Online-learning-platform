import { Card,  } from "antd";
import React, { Component } from "react";
import { Collapse } from "antd";
import { Table,  } from "antd";

import { TestApi } from "../../api/TeacherRoomapi";

import { Form, Input, Button } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultsofTests:[],
      testsfromdb: [],
      value: 1,
      isTeacher: true,
      form: undefined,
      requiredMark: undefined,

      testname: "",
      numberOfQuestions: 0,
      q: "",
      a: "",
      b: "",
      c: "",
      d: "",
      ans: "",

      questions: [],

      test: {},
    };
    this.onCollapseChange = this.onCollapseChange.bind(this);
  }
  onRequiredTypeChange = ({ requiredMarkValue }) => {
    this.setState({ requiredMark: requiredMarkValue });
  };
  onCollapseChange(e) {
    console.log(e);
  }
  onChange = (e) => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
    });
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
  onCreateTest = async () => {
    const { name } = this.props;
    const { test } = this.state;
    const payload = { name, test };
    await TestApi.insertTests(payload)
      .then((res) => {
        window.alert("succesfuly created new Test");
        console.log(res);
      })
      .then(() => {
        //this.setState({note:''});
        //this.getNotesFromDB();
        //getTestfromdb();
      })
      .catch((error) => {
        window.alert("Error Try Logout and Login");
        console.log(error);
      });
  };

  getsubmitTestsfromDB = async () => {
    const { name } = this.props;
    let roomName = name;
    const payload = { roomName,};
    await TestApi.getsubmitTests(payload)
      .then((res) => {
        //window.alert("succesfuly got submitted test data");
        //console.log(res.data.results)

        //increment test results by 1 here and then setstate
        this.setState({resultsofTests:res.data.results})
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
    /*const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
    };*/
    let {
      testsfromdb,
      isTeacher,
      requiredMark,
      q,
      a,
      b,
      c,
      d,
      ans,
      questions,
      numberOfQuestions,
      testname,
      resultsofTests
    } = this.state;
    //console.log(test)
    const columns = [
      
      {
        title: "Student Name",
        dataIndex: "userName",
        key: "userName",
      } ,
      {
        title: "Test Name",
        dataIndex: "testName",
        key: "testName  ",
        /*render: (text) => <a>{text}</a>,*/
      },
      {
        title: "Marks",
        dataIndex: "marks",
        key: "marks",
      },
      
    ]
    let cdata = resultsofTests;
    const text = "heiaio";
    if (isTeacher) {
      return (
        <div>
          <Collapse
            defaultActiveKey={["1"]} /*onChange={()=>{onCollapseChange()}}*/
          >
            <Panel header="Create a New Test" key="1">
              <p>
                <Form
                  /*form={form}*/
                  layout="vertical"
                  initialValues={{ requiredMarkValue: requiredMark }}
                  /*onValuesChange={onRequiredTypeChange}*/
                  requiredMark={requiredMark}
                >
                  {/*
      <Form.Item label="Required Mark" name="requiredMarkValue">
        <Radio.Group>
          <Radio.Button value="optional">Optional</Radio.Button>
          <Radio.Button value>Required</Radio.Button>
          <Radio.Button value={false}>Hidden</Radio.Button>
        </Radio.Group>
      </Form.Item>*/}
                  <Form.Item
                    label="Name Of The Test"
                    required
                    tooltip="This is a required field"
                  >
                    <Input
                      placeholder="Name Of The Test"
                      value={testname}
                      onChange={(e) => {
                        this.setState({ testname: e.target.value });
                      }}
                    />
                  </Form.Item>
                  <Card style={{ width: "50%" }}>
                    <Form.Item
                      label="Question"
                      required
                      tooltip="This is a required field"
                    >
                      <Input
                        placeholder="Enter the question"
                        value={q}
                        onChange={(e) => {
                          this.setState({ q: e.target.value });
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Option A"
                      required
                      tooltip="This is a required field"
                    >
                      <Input
                        placeholder="Enter Option A"
                        value={a}
                        onChange={(e) => {
                          this.setState({ a: e.target.value });
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Option B"
                      required
                      tooltip="This is a required field"
                    >
                      <Input
                        placeholder="Enter Option B"
                        value={b}
                        onChange={(e) => {
                          this.setState({ b: e.target.value });
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Option C"
                      required
                      tooltip="This is a required field"
                    >
                      <Input
                        placeholder="Enter Option C"
                        value={c}
                        onChange={(e) => {
                          this.setState({ c: e.target.value });
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Option D"
                      required
                      tooltip="This is a required field"
                    >
                      <Input
                        placeholder="Enter Option D"
                        value={d}
                        onChange={(e) => {
                          this.setState({ d: e.target.value });
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Answer for the Question"
                      required
                      tooltip={{
                        title: "Tooltip with customize icon",
                        icon: <InfoCircleOutlined />,
                      }}
                    >
                      <Input
                        placeholder="Enter A or B or C or D"
                        value={ans}
                        onChange={(e) => {
                          this.setState({ ans: e.target.value });
                        }}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="secondary"
                        onClick={() => {
                          const obj = {
                            questionname: q,
                            options: {
                              a: a,
                              b: b,
                              c: c,
                              d: d,
                            },
                            answer: ans,
                          };
                          questions.push(obj);
                          numberOfQuestions += 1;
                          this.setState(
                            { questions: questions, numberOfQuestions },
                            () => {
                              console.log(questions);
                            }
                          );
                        }}
                      >
                        Next Question
                      </Button>
                    </Form.Item>
                  </Card>
                  <Form.Item style={{ paddingTop: "10px" }}>
                    <Button
                      type="primary"
                      onClick={() => {
                        const testobj = {
                          name: testname,
                          nq: numberOfQuestions,
                          qs: questions,
                        };
                        this.setState({ test: testobj }, () => {
                          console.log(this.state.test);
                          this.onCreateTest();
                        });
                      }}
                    >
                      Create Test
                    </Button>
                  </Form.Item>
                </Form>
              </p>
            </Panel>
            <Panel header="Show Existng Tests" key="2">
              {testsfromdb.map((each) => {
                return (
                  <Card
                    hoverable
                    style={{ backgroundColor: "lightslategray" }}
                    data={each}
                  >
                    <p>{each.name}</p> <p>{each.nq}</p> <p>{each.qs.map((q)=>{return<div>{q.questionname}</div>})}</p>
                  </Card>
                );
              })}
            </Panel>
            <Panel header="Tests Results" key="3">
              <p>
              <div style={{ textAlign: "center" }}>
                <h1>All Tets Results</h1>
                <Table columns={columns} dataSource={cdata} />
              </div>
              </p>
            </Panel>
          </Collapse>
        </div>
      );
    } else {
      return (
        <div>
          <Collapse
            defaultActiveKey={["1"]} /*onChange={()=>{onCollapseChange()}}*/
          >
            <Panel header="Show New Unattended Tests" key="1">
              <p>{text}</p>
            </Panel>
            <Panel header="Show Results of Attended Tests" key="2">
              <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 3" key="3">
              <p>{text}</p>
            </Panel>
          </Collapse>
        </div>
      );
    }
  }
}

export default Test;
