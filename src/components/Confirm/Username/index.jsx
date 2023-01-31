import { message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';
import { usernameUpdateAction } from '../../../api/user';
import ErrorBoundary from '../../ErrorBoundary';
import { setUserInf } from '../../../store/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Confirm from '../index';
import { useCallback } from 'react';

const Username = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userInf } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const { username, key } = qs.parse(location.search.slice(1));
  const handleSubmit = useCallback(async () => {
    const { msg, code } = await usernameUpdateAction({
      username, key
    })
    if (code === 200) {
      message.open({
        type: 'success',
        content: msg,
      });

      message.open({
        type: 'success',
        content: msg + ',即将跳转首页',
      });
      const newUserInf = {
        ...userInf,
        username,
      }
      dispatch(setUserInf(newUserInf));
    } else {
      message.open({
        type: 'error',
        content: msg,
      });
    }
    navigate('/home/index')
  }, [location])

  if (username === undefined || key === undefined) {
    return <ErrorBoundary />
  }
  return (
    <Confirm
      title="修改邮箱"
      modalText={`你确定要修改邮箱为${username}吗`}
      handleSubmit={handleSubmit}
    />
  )

}

export default Username;
