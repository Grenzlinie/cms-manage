import React, { useState, useEffect } from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import { ReadOutlined, EditOutlined, TeamOutlined, SelectOutlined } from '@ant-design/icons';
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import MyHeader from "components/MyHeader";
import "App.less";
import { connect } from "react-redux";
// import { Dispatch } from "redux";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

interface IProps {
  key1: number;
  changeKeyFn: () => void;
}

const App = (props: IProps) => {
  //定义侧边栏当前项的值
  const [asiderKey, setAsiderKey] = useState("0");
  const [bread, setBread] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  //监听路由的变化从而修改侧边栏当前项
  useEffect(() => {
    if(location.pathname==='/'){
      //根路径重定向
      navigate('/list');
    }
    switch (location.pathname) {
      case '/list':
        setAsiderKey("1");
        setBread("查看文章列表");
        break;
      case '/edit':
        setAsiderKey("2");
        setBread("文章编辑");
        break;
      case '/means':
        setAsiderKey("3");
        setBread("修改资料");
        break;
      case '/namelist':
        setAsiderKey("4-1");
        setBread("小编名单");
        break;
      default:
        setAsiderKey("0");
        setBread("");
        break;
    }
    if(location.pathname.includes('/edit')){
      setAsiderKey('2');
      setBread("文章编辑");
    }
  }, [location.pathname])

  return (
    <Layout className="container">
      <MyHeader key={props.key1} />
      <Layout className="container_content">
        <Sider width={200}>
          <Menu
            mode="inline"
            selectedKeys={[asiderKey]}
            defaultOpenKeys={['4']}
            style={{ height: '100%', borderRight: 0 }}
            theme="dark"
          >
            <Menu.Item key="1">
              <Link to={'/list'}><ReadOutlined /> 查看文章列表
              </Link></Menu.Item>
            <Menu.Item key="2">
              <Link to={'/edit'}><EditOutlined /> 文章编辑
              </Link></Menu.Item>
            <Menu.Item key="3">
              <Link to={'/means'}><ReadOutlined /> 修改资料
              </Link></Menu.Item>
            <SubMenu
              key="4"
              icon={<TeamOutlined />}
              title="管理员"
              style={{display: localStorage.getItem('player')==='vip' ? 'block': 'none'}}>
              <Menu.Item key="4-1">
                <Link to={'/namelist'}><SelectOutlined /> 小编名单
                </Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item><Link to={'/'}>首页</Link></Breadcrumb.Item>
            <Breadcrumb.Item>{bread}</Breadcrumb.Item>
          </Breadcrumb>
          <Content className="mycontent">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <footer style={{
        textAlign: 'center',
        color: '#fff',
        height: '70px',
        lineHeight: '70px',
        background: '#001529'
      }} >Respect | Copyright &copy; 2022 Author Calvin Yu</footer>
    </Layout>
  );
};

//state的映射
const mapStateToProps = (state: { key: number }) => {
  return {
    key1: state.key
  }
}

// const mapDispatchToProps = (dispatch: Dispatch)=>{
//   return{
//     changeKeyFn(){
//       dispatch({type: 'changeKey'})
//     }
//   }
// }

export default connect(mapStateToProps)(App);
