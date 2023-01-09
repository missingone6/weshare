import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Form, Input, message, Space } from 'antd';
import { LockOutlined, UserOutlined, SmileOutlined } from '@ant-design/icons';
import { loginAction } from '../../api/login';
import localStorage from '../../storage/localStorage';
import { CAPTCHA_ID, TOKEN } from '../../storage/config';
import useSvgCaptcha from '../hooks/useSvgCaptcha';
import LoginWrapper from './style';

const Login = () => {
  const [svgCaptcha, refreshSvgCaptcha] = useSvgCaptcha();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const onFinish = async (obj) => {
    console.log('Success:', obj);
    const { username, password, code } = obj;
    const cid = localStorage.getItem(CAPTCHA_ID);
    const result = await loginAction({
      username,
      password,
      cid,
      code
    })
    if (result.code === 200) {
      messageApi.open({
        type: 'success',
        content: result.msg + ',即将跳转到首页',
      });
      localStorage.setItem(TOKEN, result.token);
      setTimeout(() => {
        navigate('/home')
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
          rules={[{ required: true, message: '请输入您的用户名' }]}
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
