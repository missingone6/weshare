import { Button, Checkbox, Form, Input, message, Space } from 'antd';
import { LockOutlined, UserOutlined, SmileOutlined } from '@ant-design/icons';
import localStorage from '../../storage/localStorage';
import { CAPTCHA_ID } from '../../storage/config';
import useSvgCaptcha from '../../hooks/useSvgCaptcha';
import StyleWrapper from './style';
import { sendmailAboutPasswordAction } from '../../api/user';

const ForgetPassword = () => {

  const [svgCaptcha, refreshSvgCaptcha] = useSvgCaptcha();
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = async (obj) => {
    const { username, password, code } = obj;
    const cid = localStorage.getItem(CAPTCHA_ID);
    const { code: returnCode, msg } = await sendmailAboutPasswordAction({
      username,
      newPassword: password,
      cid,
      code
    })
    if (returnCode === 200) {
      messageApi.open({
        type: 'success',
        content: msg
      });
      refreshSvgCaptcha();
    } else {
      refreshSvgCaptcha();
      messageApi.open({
        type: 'error',
        content: msg,
      });
    }
  };

  return (
    <StyleWrapper>
      {contextHolder}
      <Form
        name="normal_forget"
        className="forget-form"
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
            placeholder="请输入新的密码"
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
              className='forget-form-captcha'
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
            <a className="forget-form-forgot" href="/login">
              登录
            </a>
            <span> | </span>
            <a className="forget-form-register" href="/register">
              注册
            </a>
          </div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block className="forget-form-button">
            找回密码
          </Button>
        </Form.Item>
      </Form>
    </StyleWrapper>
  );
}

export default ForgetPassword;
