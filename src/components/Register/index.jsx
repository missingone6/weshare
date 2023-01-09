import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, Space, message } from 'antd';
import { LockOutlined, UserOutlined, SmileOutlined, RobotOutlined } from '@ant-design/icons';
import RegisterWrapper from './style';
import useSvgCaptcha from '../hooks/useSvgCaptcha';
import { registerAction } from '../../api/login';
import { CAPTCHA_ID } from '../../storage/config';

const Register = () => {
  const navigate = useNavigate();
  const [svgCaptcha, refreshSvgCaptcha] = useSvgCaptcha();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (obj) => {
    const { username, password, code, name } = obj;
    const cid = localStorage.getItem(CAPTCHA_ID);
    const result = await registerAction({
      username,
      password,
      cid,
      code,
      name
    })
    if (result.code === 200) {
      messageApi.open({
        type: 'success',
        content: result.msg + ',即将跳转到登录页',
      });
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } else {
      refreshSvgCaptcha();
      messageApi.open({
        type: 'error',
        content: result.msg,
      });
    }
  };


  return (
    <RegisterWrapper>
      {contextHolder}
      <Form
        name="normal_register"
        className="register-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入您的用户名' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[{ required: true, message: '请输入2至16位的昵称', min: 2, max: 16 }]}
        >
          <Input prefix={<RobotOutlined />} placeholder="请输入昵称" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入6至16位的密码', min: 6, max: 16 }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="请输入密码"
          />
        </Form.Item>
        <Form.Item
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
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="请再次输入密码"
          />
        </Form.Item>
        <Form.Item
          name="code"
          rules={[{ required: true, message: '验证码长度必须为4', len: 4 }]}
        >
          <Space direction="horizontal">
            <Input
              prefix={<SmileOutlined />}
              placeholder="请输入验证码"
            />
            <div
              className='register-form-captcha'
              onClick={refreshSvgCaptcha}
              dangerouslySetInnerHTML={{
                __html: svgCaptcha
              }}></div>
          </Space>
        </Form.Item>
        <Form.Item>
          <div style={{ float: 'right' }}>
            <a className="register-form-forgot" href="/forget">
              忘记密码
            </a>
            <span> | </span>
            <a href="/login">登录</a>
          </div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block className="register-form-button">
            注册
          </Button>
        </Form.Item>
      </Form>
    </RegisterWrapper>
  );
}

export default Register;
