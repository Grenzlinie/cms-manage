import React from 'react'
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './less/MyHeader.less'


const logo = require('assets/images/logo.png')
const default_avatar = require('assets/images/avatar.jpg')


export default function MyHeader() {

  const menu = (
    <Menu>
      <Menu.Item>修改资料</Menu.Item>
      <Menu.Divider />
      <Menu.Item>退出登录</Menu.Item>
    </Menu>
  );

  return (
    <header>
        <img src={logo} height={50} alt="" />
        <div className="logo" />
        <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" href="!#" onClick={e => e.preventDefault()}>
                <img src={default_avatar} width={40} style={{borderRadius: '50%', marginRight: '15px'}} alt="" />
                <span style={{marginRight: '10px'}}>匿名用户</span>
                <DownOutlined />
            </a>
        </Dropdown>
    </header>
  )
}
