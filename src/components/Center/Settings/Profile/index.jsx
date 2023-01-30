import { Button, Form, Input, message } from 'antd';
import { useSelector } from "react-redux";
import { sendmailAboutUsernameAction } from '../../../../api/user';

const Profile = () => {
  const { userInf } = useSelector(state => state.user)

  const onFinishEmail = async ({ username }) => {
    const { msg, code } = await sendmailAboutUsernameAction({
      username
    })
    if (code === 200) {
      message.open({
        type: 'success',
        content: msg,
      });
    } else {
      message.open({
        type: 'error',
        content: msg,
      });
    }
  };
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 3,
        }}
        wrapperCol={{
          span: 8,
        }}
        onFinish={onFinishEmail}
        autoComplete="off"
        initialValues={{
          username: userInf.username
        }}
      >
        <Form.Item
          label="邮箱(用户名)"
          name="username"
          rules={
            [
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入正确的邮箱' }
            ]
          }
        >
          <Input/>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 3,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            修改邮箱
          </Button>
        </Form.Item>
      </Form>
      <Form
        name="basic"
        labelCol={{
          span: 3,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="昵称"
          name="name"
          rules={[{ required: true, message: '请输入2至16位的昵称', min: 2, max: 16 }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="个性签名"
          name="regmark"
          rules={[{ required: true, message: '请输入30位以内的的昵称', max: 30 }]}
        >
          <Input.TextArea rows={4} placeholder="随便说点什么吧" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 3,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            确认修改
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
export default Profile;

