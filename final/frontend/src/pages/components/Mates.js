import React, { Component } from "react";
//import PropTypes from "prop-types";
import { Table,  } from "antd";
import { Mate } from "../../api/TeacherRoomapi";

class Mates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      students: [],
    };
    //this.getsMatesCall = this.getsMatesCall.bind(this);
  }
  componentDidMount = async () => {
    const name = this.state;
    const payload = name;
    await Mate.getMates(payload)
      .then((res) => {
        //console.log(res.data.results)
        let students = [],
          key = 0;
        res.data.results.map((stu) => {
          let temp = {};
          temp.name = stu.username;
          temp.Email = stu.userMail;
          key += 1;
          temp.key = key;
          students.push(temp);
          return temp;
        });
        this.setState({ students });
      })
      .catch((error) => {
        console.error("Errprs", error);
      });
  };

  render() {
    const students = this.state.students;
    const columns = [
      {
        title: "Sl No.",
        dataIndex: "key",
        key: "key",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        /*render: (text) => <a>{text}</a>,*/
      },
      {
        title: "Email",
        dataIndex: "Email",
        key: "Email",
      } /*
            
      {
        title: "Tags",
        key: "tags",
        dataIndex: "tags",
        render: (tags) => (
          <>
            {tags.map((tag) => {
              let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "loser") {
                color = "volcano";
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },*/
      /*
            {
              title: 'Action',
              key: 'action',
              render: (text, record) => (
                <Space size="middle">
                  <a>Invite {record.name}</a>
                  <a>Delete</a>
                </Space>
              ),
            },*/
    ];
    console.log(students);
    let data = students; /*
    const data = [
      {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["Student"],
      },
      {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["Student"],
      },
      {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["teacher"],
      },
    ];
    */

    return (
      <div style={{ textAlign: "center" }}>
        <h1>All Members</h1>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default Mates;
