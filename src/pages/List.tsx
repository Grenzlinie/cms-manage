import React from 'react'
import { Table, Button } from 'antd'

const columns = [
  {
    title: '文章标题',
    dataIndex: 'title',
    width:'60%'
  },
  {
    title: '发布时间',
    dataIndex: 'time',
    width:'20%'
  },
  {
    title: '操作',
    dataIndex: 'action',
  },
];

interface IData{
  key: number;
  title: React.ReactNode;
  time: number;
  action: React.ReactNode;
}

//操作按钮的组件
const ActionBtn = () => (
  <>
    <Button type='primary' style={{marginRight:'20px'}}>编辑</Button>
    <Button type='primary' danger>删除</Button>
  </>
)

//标题与副标题组件
const TitleComp = () => (
  <>
    <div><a href='!#'>标题标题标题标题</a></div>
    <p style={{color:'#999'}}>副标题副标题副标题副标题</p>
  </>
)

const data: IData[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    title: <TitleComp />,
    time: 32,
    action: <ActionBtn />,
  });
}


export default function List() {
  return (
    <Table showHeader={false} columns={columns} dataSource={data} />
  )
}
