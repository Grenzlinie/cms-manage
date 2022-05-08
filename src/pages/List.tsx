import React, { useEffect, useState } from 'react'
import { Table, Button, message, Pagination } from 'antd'
import { GetArticleListApi, DeleteArticleApi } from 'request/api';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const columns = [
  {
    title: '文章标题',
    dataIndex: 'title',
    width: '60%'
  },
  {
    title: '发布时间',
    dataIndex: 'time',
    width: '20%'
  },
  {
    title: '操作',
    dataIndex: 'action',
  },
];

interface IData {
  key: number;
  title: React.ReactNode;
  time: string;
  action: React.ReactNode;
}

//操作按钮的组件
const ActionBtn = (props: {current: number ; id: number; getListFn: (page:number, pageSize:number) => void; }) => {
  const navigate = useNavigate();

  const goToEdit = () => {
    //携带id调转到编辑页面
    navigate('/edit/'+props.id);
  }

  const deleteFn = () => {
    DeleteArticleApi({ id: props.id }).then((res: any) => {
      if (res.errCode === 0) {
        message.success(res.message);
        props.getListFn(props.current, 10);
      } else {
        message.error(res.message);
      }
    })
  }

  return (
    <>
      <Button type='primary' style={{ marginRight: '20px' }} onClick={goToEdit}>编辑</Button>
      <Button type='primary' danger onClick={deleteFn}>删除</Button>
    </>
  )
}


//标题与副标题组件
const TitleComp = (props: { title: string; subTitle?: string }) => (
  <>
    <div><a href='!#'>{props.title}</a></div>
    <p style={{ color: '#999' }}>{props.subTitle || ""} </p>
  </>
)



export default function List() {
  //使用泛型
  const [data, setData] = useState<IData[]>([])
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  interface IRes {
    errCode?: number;
    message?: string;
    data?: any;
  }

  const getListFn = (page: number, pageSize: number) => {
    GetArticleListApi({
      current: page,
      counts: pageSize
    }).then((res: IRes) => {
      if (res.errCode === 0) {
        message.success(res.message, 1.0)
      }

      let newarr: IData[] = [];
      interface IItem {
        title: string;
        subTitle: string;
        date: string;
        id: number;
      }
      //设置总数据
      setTotal(res.data.total);
      //设置当前页，每页个数
      setCurrent(res.data.current)
      res.data.arr.forEach((item: IItem) => {
        let obj = {
          key: item.id,
          title: <TitleComp title={item.title} subTitle={item.subTitle} />,
          time: moment(item.date).format('YYYY-MM-DD'),
          action: <ActionBtn current={res.data.current} getListFn={getListFn} id={item.id} />
        }
        newarr.push(obj);
      })
      setData(newarr);
    })
  }

  const onPageChange = (page:number, pageSize: number) => {
    getListFn(page, pageSize);
  }

  useEffect(() => {
    getListFn(1, 10);
  }, [])// eslint-disable-line react-hooks/exhaustive-deps


  return (
    <>
      <Table showHeader={false} columns={columns} dataSource={data} pagination={false} />
      <Pagination
        onChange={onPageChange}
        current={current}
        total={total}
      />
    </>
  )
}
