import React from 'react';
import { Layout, Menu, Breadcrumb, Button  } from 'antd';
//import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
//import Notification from 'rc-notification';
import 'rc-notification/assets/index.css'

import auth from './components/auth';
import RoomContent from "./components/RoomContent";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headerSelected: 0,
            username: props.username?props.username:this.props.username,
            userMail: props.userMail,
            isTeacher: JSON.stringify(props.isTeacher),
            shownoti:false,
        }
    }
    componentDidMount(){
        console.log(this.props)
    }
    render() {
        const {username,isTeacher} = this.state;
        const tempisTeacher = isTeacher==='true' ? 'Teacher' : 'Student' ;
        const create='Create',join='Join';

        return (
            <div style={{
              fontFamily: 'Comfortaa',

            }}>
                <Layout>
                    <Header className="header">
                        <div className="logo" />
                        <Menu onSelect={(val) => { this.setState({ headerSelected: val.key }); /*console.log(this.state.headerSelected)*/ }} theme="dark" mode="horizontal" defaultSelectedKeys={[`${this.state.headerSelected}`]}>
                            <Menu.Item key="0">Home!!</Menu.Item>
                            {/*<Menu.Item key="2">Notifications</Menu.Item>
                            <Menu.Item key="1">Mates</Menu.Item>
                            <Menu.Item key="3">ChatRoom</Menu.Item>*/}
                            <Menu.Item key="4" onClick={() => {
                                
                                    this.props.history.push('/profile');
                                    
                                
                            }}>Profile</Menu.Item>
                            <Menu.Item key="5" onClick={() => {
                                auth.logout(() => {
                                    this.props.history.push('/');
                                    console.log("Login is " + auth.isAuthemticated());
                                })
                            }}>logout</Menu.Item>
                        </Menu>
                    </Header>
                    <Layout>
                        <Sider width={200} className="site-layout-background">
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                <SubMenu key="sub1" title="">
                                    <Menu.Item key="1"> <Button type='primary' onClick={()=>{this.props.isTeacher === true ? this.props.history.push('/createRoom'): this.props.history.push('/joinRoom');}}>  {this.props.isTeacher === true ? create: join}  a Room </Button></Menu.Item>
                                </SubMenu>
                               
                                {/*<SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                                    <Menu.Item key="1">option1</Menu.Item>
                                    <Menu.Item key="2">option2</Menu.Item>
                                    <Menu.Item key="3">option3</Menu.Item>
                                    <Menu.Item key="4">option4</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                                    <Menu.Item key="5">option5</Menu.Item>
                                    <Menu.Item key="6">option6</Menu.Item>
                                    <Menu.Item key="7">option7</Menu.Item>
                                    <Menu.Item key="8">option8</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                                    <Menu.Item key="9">option9</Menu.Item>
                                    <Menu.Item key="10">option10</Menu.Item>
                                    <Menu.Item key="11">option11</Menu.Item>
                                    <Menu.Item key="12">option12</Menu.Item>
                                </SubMenu>*/}
                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>Home /</Breadcrumb.Item>
                               {/*<Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>nav {this.state.headerSelected}</Breadcrumb.Item>*/}
                            </Breadcrumb>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 500,
                                }}
                            >
                                
                                {/*
                                    this.state.shownoti === false ?
                                    
                                    Notification.newInstance({}, notification => {
                                        notification.notice({
                                          content: `Welcome ${username} ... You have logged in as a ${tempisTeacher}` ,
                                          duration:2,
                                          closable:true,
                                          style:{padding:'30px',paddingLeft:'30px',paddingRight:'40px'},
                                        });
                                      })
                                      
                                      : null
                                }
                                {
                                    this.state.shownoti === false ? this.setState({shownoti:true}):null
                                */}
                                
                                
                                {/*
                                <h1>Hello </h1>
                                this.props.username !== undefined ? this.props.username : username*/}
                                {tempisTeacher?<h1>Rooms Created:</h1>:<h1>Rooms Joined:</h1>}
                                <RoomContent userMail={this.state.userMail} username={username} isTeacher={this.state.isTeacher}/>
                                {/*<Card title="Data Structures" style={{ width: 300 }}>
                                    <p>Proff. Ranganath</p>
                                    <p>In this subject we will learn about diffrent types of data structures</p>
                                    <p>Card content</p>
                                </Card>*/}
                                
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default DashBoard;
