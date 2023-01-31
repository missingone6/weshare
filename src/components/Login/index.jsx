import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Form, Input, message, Space } from 'antd';
import { LockOutlined, UserOutlined, SmileOutlined } from '@ant-design/icons';
import localStorage from '../../storage/localStorage';
import { CAPTCHA_ID, TOKEN } from '../../storage/config';
import useSvgCaptcha from '../../hooks/useSvgCaptcha';
import LoginWrapper from './style';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../store/features/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';

const Login = () => {
  const dispatch = useDispatch();

  const [svgCaptcha, refreshSvgCaptcha] = useSvgCaptcha();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const onFinish = async (obj) => {
    const { username, password, code } = obj;
    const cid = localStorage.getItem(CAPTCHA_ID);
    const result = unwrapResult(await dispatch(userLogin({
      username,
      password,
      cid,
      code
    })))
    const { token, msg, code: returnCode } = result;
    if (returnCode === 200) {
      messageApi.open({
        type: 'success',
        content: msg + ',即将跳转到首页',
      });
      localStorage.setItem(TOKEN, token);
      setTimeout(() => {
        navigate('/home/index')
      }, 1000);
    } else {
      refreshSvgCaptcha();
      messageApi.open({
        type: 'error',
        content: msg,
      });
    }
  };

  return (
    <LoginWrapper>
      {contextHolder}
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={
            [
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入正确的邮箱' }
            ]
          }
        >
          <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
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
          name="code"
          rules={[{ required: true, message: '验证码长度必须为4', len: 4 }]}
        >
          <Space direction="horizontal">
            <Input
              prefix={<SmileOutlined />}
              placeholder="请输入验证码"
            />
            <div
              className='login-form-captcha'
              onClick={refreshSvgCaptcha}
              dangerouslySetInnerHTML={{
                __html: svgCaptcha
              }}></div>
          </Space>
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <div style={{ float: 'right' }}>
            <a className="login-form-forgot" href="/forget">
              忘记密码
            </a>
            <span> | </span>
            <a className="login-form-register" href="/register">
              注册
            </a>
          </div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block className="login-form-button">
            登录
          </Button>
        </Form.Item>
      </Form>
    </LoginWrapper>
  );
}

export default Login;
