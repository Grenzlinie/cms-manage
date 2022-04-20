import React, { useState } from 'react'
import { Form, Input, Button } from 'antd';
import {Link} from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.less'

const logo = require("assets/images/logo.png")

export default function Register() {

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='login_box' >
      <img src={logo} className='logo' alt="" />
      <Form
        size='large'
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item

          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder='请输入用户名'/>
        </Form.Item>

        <Form.Item

          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password  prefix={<LockOutlined className="site-form-item-icon" />} placeholder='请输入密码' />
        </Form.Item>

        <Form.Item

          name="password"
          rules={[{ required: true, message: '请输入确认密码!' }]}
        >
          <Input.Password  prefix={<LockOutlined className="site-form-item-icon" />} placeholder='请再次确认密码' />
        </Form.Item>

        <Form.Item>
          <Link to="/login">已有账号，返回登录</Link>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block size='large'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
