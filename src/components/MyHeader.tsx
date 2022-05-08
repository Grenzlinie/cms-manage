import React, { useEffect, useState } from 'react'
import { Menu, Dropdown, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './less/MyHeader.less'
import { useNavigate } from 'react-router-dom';

const logo = require('assets/images/logo.png')
const default_avatar = 'avatar.jpg';


export default function MyHeader() {
  const [avatar, setAvatar] = useState(default_avatar);
  const [username, setUsername] = useState("匿名用户");
  const navigate = useNavigate() //用Router库中的Link标签也可以

  // 模拟componentDidMount
  useEffect(() => {
    // 虽然已经在componentDidMount拿到了用户数据，但是没办法让它更新，只能通过刷新页面去更新。
    let avatar1 = localStorage.getItem("avatar") || default_avatar;
    let username1 = localStorage.getItem("username") || "匿名用户";
    setAvatar(avatar1);
    setUsername(username1)
  }, [])

  const goMeans = () => {
    let token = localStorage.getItem('cms-token');
    if (token) {
      navigate('/means')
    } else {
      //给出提示，并跳转登录页
      message.warning("登陆失效，请重新登录", 1.5);
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    }
  }

  const logOut = () => {
    localStorage.removeItem('cms-token');
    localStorage.removeItem('username');
    localStorage.removeItem('avatar');
    message.success("即将跳转登录页", 1.5);
    setTimeout(()=>{
      navigate('/login')
    }, 1500)
  }

  const menu = (
    <Menu>
      <Menu.Item key={1} onClick={goMeans} >修改资料</Menu.Item>
      <Menu.Divider />
      <Menu.Item key={2} onClick={logOut}>退出登录</Menu.Item>
    </Menu>
  );

  return (
    <header>
      <img src={logo} height={50} alt="" />
      <div className="logo" />
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" href="!#" onClick={e => e.preventDefault()}>
          <img src={process.env.SERVER_PORT + '/' +avatar} width={40} style={{ borderRadius: '50%', marginRight: '15px' }} alt="" />
          <span style={{ marginRight: '10px' }}>{username}</span>
          <DownOutlined />
        </a>
      </Dropdown>
    </header>
  )
}
