import { message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';
import { verifyRegisterAction } from '../../../api/login';
import ErrorBoundary from '../../ErrorBoundary';
import Confirm from '../index';
import { useCallback } from 'react';

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = qs.parse(location.search.slice(1));
  const handleSubmit = useCallback(async () => {
    const { msg, code } = await verifyRegisterAction({
      token
    })
    if (code === 200) {
      message.open({
        type: 'success',
        content: msg + ',即将跳转登录页面',
      });
      navigate('/login')
    } else {
      message.open({
        type: 'error',
        content: msg,
      });
    }
  }, [location])

  if (token === undefined) {
    return <ErrorBoundary />
  }
  return (
    <Confirm
      title="注册-验证邮箱"
      modalText={`你确定要注册吗`}
      handleSubmit={handleSubmit}
    />
  )

}

export default Register;
