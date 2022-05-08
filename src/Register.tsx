import React from 'react'
import { Form, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { RegisterApi } from 'request/api';
import { message } from 'antd';
import './Login.less'

const logo = require("assets/images/logo.png")

interface IValues {
  username: string;
  password: string;
  password1?: string;
}

export default function Register() {
  const navigate = useNavigate();

  const onFinish = (values: IValues) => {
    let  {username, password, password1} = values;
    if(password !== password1){
      message.error("请输入相同的密码");
      return;
    }
    interface IRes{
      errCode?: number;
      message?: string;
      data?: any;
    }
    // 注册
    RegisterApi({username, password}).then((res: IRes) => {
      if (res.errCode === 0) {
        //提示
        message.success(res.message);
        //跳转登录页
        setTimeout(()=>{
          navigate("/login")
        }, 1000)
      } else {
        message.error(res.message);
      }
    });
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
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder='请输入用户名' />
        </Form.Item>

        <Form.Item

          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder='请输入密码' />
        </Form.Item>

        <Form.Item

          name="password1"
          rules={[{ required: true, message: '请输入确认密码!' }]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder='请再次确认密码' />
        </Form.Item>

        <Form.Item>
          <Link to="/login">已有账号，返回登录</Link>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block size='large'>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
