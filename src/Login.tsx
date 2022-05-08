import React from 'react'
import { Form, Input, Button, message } from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { LoginApi } from 'request/api';
import './Login.less'

const logo = require("assets/images/logo.png")
interface IValues {
  username: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();

  //点击登录
  const onFinish = (values: IValues) => {

    interface IRes{
      errCode?: number;
      message?: string;
      data?: any;
    }

    LoginApi(values).then((res: IRes) => {
      if (res.errCode === 0) {
        //提示
        message.success(res.message, 1);
        //保持用户信息和token
        // localstorage || react-redux
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('cms-token', res.data['cms-token']);
        localStorage.setItem('avatar', res.data.avatar); //环境变量
        localStorage.setItem('player', res.data.player);
        localStorage.setItem('editable', res.data.editable);
        //跳转根路径
        setTimeout(()=>{
          navigate("/")
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
      <img src={logo} className='logo' alt="" height='80px' />
      <Form
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

        <Form.Item>
          <Link to="/register">还没账号？立即注册</Link>
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
