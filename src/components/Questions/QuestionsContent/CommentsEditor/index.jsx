import StyleWrapper from './style';
import { Button, Form, message } from 'antd';
import MyEditor from '../../../AddPosts/MyEditor';
import { useCallback, useState } from 'react';
import { addCommentsAction } from '../../../../api/comments';

const tailLayout = {
  wrapperCol: {
    offset: 10,
    span: 14,
  },
};
const CommentsEditor = ({ pid }) => {
  const [form] = Form.useForm();
  const [html, setHtml] = useState('');

  // 修改form表单中content属性的值
  const setFormContentValue = useCallback((note) => {
    setHtml(note)
    form.setFieldValue('content', note);
  }, []);

  const onFinish = async ({ content }) => {
    const result = await addCommentsAction({
      content,
      pid,
    });
    const { code, msg, data } = result;
    if (code === 200) {
      message.open({
        type: 'success',
        content: msg,
      });
      // 清空输入框内容
      setFormContentValue('');
    } else {
      message.open({
        type: 'error',
        content: msg,
      });
    }
  };


  return (
    <StyleWrapper>
      <Form
        form={form}
        className="form"
        name="comments-form"
        onFinish={onFinish}
      >
        <Form.Item
          name="content"
        >
          <MyEditor setFormContentValue={setFormContentValue} html={html} setHtml={setHtml} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            发表评论
          </Button>
        </Form.Item>
      </Form>
    </StyleWrapper>
  );
}
export default CommentsEditor;

