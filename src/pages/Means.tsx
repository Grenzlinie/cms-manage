import React, { useState } from 'react'
import { ChangeUserInfo } from 'request/api'
import { Form, Input, Button, message, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { Dispatch } from 'redux'
import './Means.less'
interface IProps {
  changeKeyFn: () => void;
}

function Means(props: IProps) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  interface IRes {
    errCode?: number;
    message?: string;
    data?: any;
  }

  const onFinish = (values: any) => {
    console.log('Success:', values);
    //调接口，修改用户名和密码
    ChangeUserInfo({
      username: values.username || "",
      password: values.password || ""
    }).then((res: IRes) => {
      if (res.errCode === 0) {
        message.success(res.message);
        let { avatar, username } = res.data;
        //储存用户信息
        localStorage.setItem("avatar", avatar);
        localStorage.setItem("username", username);
        localStorage.setItem("cms-token", res.data['cms-token'])
        //更新Header组件,走react-redux
        props.changeKeyFn();
      } else if (res.errCode === 1) {
        message.warning(res.message);
      }
    })
  };

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      if(info.file.response.errCode === 0 ){
        message.success("头像修改成功");
        localStorage.setItem("avatar", info.file.response.data.avatar);
        localStorage.setItem("username", info.file.response.data.username);
        localStorage.setItem("cms-token", info.file.response.data['cms-token']);
        props.changeKeyFn();
      }
      setLoading(false);
    }
  };

  return (
    <div>
      <Form
        style={{ width: '400px' }}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="on"
      >
        <Form.Item
          label="Username"
          name="username"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={process.env.SERVER_PORT + "/manage/upload"}
        headers={{ 'cms-token': localStorage.getItem('cms-token') as string}}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeKeyFn() {
      dispatch({ type: "changeKey" })
    }
  }
}

export default connect(null, mapDispatchToProps)(Means);