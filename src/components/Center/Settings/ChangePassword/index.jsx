import { Button, Form, Input } from 'antd';

const ChangePassword = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <Form
      name="changePassword"
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
        label="当前密码"
        name="nowPassword"
        rules={[{ required: true, message: '请输入6至16位的密码', min: 6, max: 16 }]}
      >
        <Input type="password" />
      </Form.Item>
      <Form.Item
        label="新密码"
        name="password"
        rules={[{ required: true, message: '请输入6至16位的密码', min: 6, max: 16 }]}
      >
        <Input type="password" />
      </Form.Item>
      <Form.Item
        label="确认密码"
        name="repeatPassword"
        dependencies={['password']}
        rules={[
          { required: true, message: '请输入6至16位的密码', min: 6, max: 16 },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次密码输入不一样'));
            },
          })
        ]}
      >
        <Input type="password" />
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
  );
}
export default ChangePassword;

