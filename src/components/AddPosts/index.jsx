import StyleWrapper from './style';
import { Button, Form, Input, Select, InputNumber, Modal, message } from 'antd';
import { menuConfig1 as selectData } from '../Home/HomeHeader';
import MyEditor from './MyEditor';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import localStorage from '../../storage/localStorage';
import { EDITORDATA } from '../../storage/config';
import { addPostsAction } from '../../api/content';
const { Option } = Select;

const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 24,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 10,
    span: 14,
  },
};

const AddPosts = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [html, setHtml] = useState('')

  const onFinish = async (values) => {
    const result = await addPostsAction(values);
    const { code, msg, data } = result;
    if (code === 200) {
      message.open({
        type: 'success',
        content: msg,
      });
      localStorage.setItem(EDITORDATA, "");
      navigate('/home/index')
    } else {
      message.open({
        type: 'error',
        content: msg,
      });
    }
  };
  // 修改form表单中content属性的值
  const setFormContentValue = useCallback((note) => {
    setHtml(note)
    form.setFieldValue('content', note);
  }, []);

  // 确认弹窗
  const handleOk = () => {
    setIsModalOpen(false);
    const editorData = localStorage.getItem(EDITORDATA)
    setFormContentValue(editorData);
  };

  // 关闭弹窗
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  // 发帖内容保存到localStorage里，每1秒保存一次
  useEffect(() => {
    const timer = setInterval(() => {
      const { content } = form.getFieldsValue(true);
      if (content !== '' && content !== undefined) {
        localStorage.setItem(EDITORDATA, content);
      }
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  // 弹出弹窗，问用户是否恢复上次保存的发帖内容？
  useEffect(() => {
    const editorData = localStorage.getItem(EDITORDATA)
    if (editorData !== '' && editorData !== '<p><br></p>') {
      setIsModalOpen(true);
    }
  }, [])

  return (
    <StyleWrapper>
      <Form
        {...layout}
        form={form}
        className="form"
        name="control-hooks"
        onFinish={onFinish}
        initialValues={{
          favs: 5
        }}
      >

        <Form.Item
          name="catalog"
          label="文章分类"
          rules={[
            {
              required: true,
            },
          ]}

        >
          <Select
            placeholder="请选择"
          >
            {
              selectData.map(({ label, key }) =>
                <Option key={key} value={key}>{label}</Option>
              )
            }
          </Select>
        </Form.Item>


        <Form.Item
          name="favs"
          label="悬赏分"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber min={1} max={10000} />
        </Form.Item>

        <Form.Item
          name="title"
          label="文章标题"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input size='large' />
        </Form.Item>

        <Form.Item
          name="content"
        >
          <MyEditor setFormContentValue={setFormContentValue} html={html} setHtml={setHtml} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            发表新帖
          </Button>
        </Form.Item>
      </Form>

      <Modal title="发表新贴" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>是否要恢复上次的发帖记录？</p>
      </Modal>
    </StyleWrapper>
  );
}
export default AddPosts;

