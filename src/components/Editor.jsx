import { useEffect, useState } from 'react';
import { PageHeader, Button, message } from 'antd';
import E from 'wangeditor'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import moment from 'moment'
import MyModal from 'components/MyModal'
import { EditArticleApi, GetArticleByIdApi, AddArticleApi } from 'request/api'

let editor = null
const Editor = () => {
  const { id } = useParams();
  const location = useLocation();
  const [content, setContent] = useState("");
  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle] = useState("");
  const [modalSubTitle, setModalSubTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // 富文本编辑器实例化
    editor = new E("#myeditor")

    editor.config.onchange = (newHtml) => {
      setContent(newHtml);
    }

    // 创建
    editor.create()

    if (id) {
      //id存在编辑文章
      GetArticleByIdApi({id}).then(res => {
        if (res.errCode === 0) {
          message.success(res.message, 0.5);
          //设置富文本编辑器的内容
          editor.txt.html(res.data.content);
          //设置模态框中的文章标题
          setModalTitle(res.data.title);
          setModalSubTitle(res.data.subTitle);
        }else{
          message.error(res.message, 0.5);
        }
      })
    }

    return () => {
      // 组件销毁时销毁编辑器
      editor.destroy()
    }
    // eslint-disable-next-line
  }, [])

  //模态框点击提交触发ajax请求
  const submitArticleEdit = (values) => {
    //有id调用编辑接口
    if(id){
      EditArticleApi({
        ...values,
        content,
        id
      }).then(res =>{
        message.success(res.message);
        setShowModal(false);
      })
    }else{
      AddArticleApi({
        ...values,
        content
      }).then(res=>{
        message.success(res.message);
        setShowModal(false);
      })
    }

  }

  const returnBtn = () =>{
    navigate('/list')
  }

  return (
    <div className="editor">
      <PageHeader
        style={{ padding: 0, marginBottom: '20px' }}
        ghost={false}
        backIcon={location.pathname === '/edit' ? false : <ArrowLeftOutlined onClick={returnBtn}/>}
        onBack={() => null}
        title="文章编辑"
        subTitle={`当前日期：${moment().format('YYYY-MM-DD')}`}
        extra={[
          <Button key="3" type="primary" onClick={() => setShowModal(true)}>提交文章</Button>,
        ]}
      ></PageHeader>
      <div id="myeditor"></div>
      <MyModal showModal={showModal} setShowModal={setShowModal} title={modalTitle} subTitle={modalSubTitle} submitArticleEdit={submitArticleEdit} />
    </div>
  );
}

export default Editor;
