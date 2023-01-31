import { message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';
import { passwordUpdateAction } from '../../../api/user';
import ErrorBoundary from '../../ErrorBoundary';
import Confirm from '../index';
import { useCallback } from 'react';

const Password = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username, key } = qs.parse(location.search.slice(1));
  const handleSubmit = useCallback(async () => {
    const { msg, code } = await passwordUpdateAction({
      key
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

  if (username === undefined || key === undefined) {
    return <ErrorBoundary />
  }
  return (
    <Confirm
      title="修改密码"
      modalText={`你确定要用户名为${username}的密码吗`}
      handleSubmit={handleSubmit}
    />
  )

}

export default Password;
