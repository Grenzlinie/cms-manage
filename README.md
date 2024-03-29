## 项目基本情况介绍：

本项目是一个基于TypeScript+React+Node.js开发的企业后台内容管理系统。主要实现了管理人员的注册登录及信息更改，文章内容的增删查改。

项目启动：

```javascript
//前端后端均为
npm start
```

项目线上地址：

项目内容并不复杂，适合我这样的萌新入门Typescript,React框架与AntD组件库的使用。

## 技术选型：

### 前端部分:

1.使用TypeScript+HTML+Less+React+AntD进行前端页面显示

2.使用react-router作为页面路由管理和懒加载的实现

3.使用react-redux进行状态管理

4.使用axios封装ajax请求与后端进行http传输

5.使用DocWay进行前后端Api接口参数的协同管理

### 后端部分:

1.使用Node.js搭建后端服务器

2.使用koa2进行后端路由管理，静态图片资源路径和跨域问题等处理

3.使用jwt进行鉴权处理

4.使用Multer处理图片传输，重命名和大小优化

5.使用MySQL进行文章内容和管理人员两个数据库的管理

## 效果图
登录注册<br>
![登录注册](/login.png)<br>
文章列表<br>
![文章列表](/article-list.png)<br>
文章编辑<br>
![文章编辑](/edit.png)<br>
用户信息修改<br>
![信息修改](/user-information.png)<br>
管理员<br>
![管理员](/manager.png)<br>
