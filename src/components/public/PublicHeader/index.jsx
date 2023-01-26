import { Menu, Avatar } from 'antd';
import { CloudSyncOutlined } from '@ant-design/icons';
import PublicHeaderWrapper from './style';
import { useNavigate } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../../../service/config'
import localStorage from '../../../storage/localStorage';
import { TOKEN, USERINF } from '../../../storage/config';
import { clearAuth } from '../../../store/features/userSlice';
const menuConfigIsNotLogIn = [
  {
    label: '登录',
    key: 'login',
  },
  {
    label: '注册',
    key: 'register',
  },
]

const PublicHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInf, isLogin } = useSelector(state => state.user)

  const handleMenuClickIsNotLogIn = useCallback((e) => {
    navigate(`/${e.key}`)
  }, []);
  const handleMenuClickIsLogIn = ({ key, keyPath }) => {
    if (key === 'exit') {
      // 退出登录
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(USERINF);
      dispatch(clearAuth());
    } else {
      navigate(`/${keyPath.reverse().join('/')}`)
    }
  }
  const menuConfigIsLogIn = useMemo(() => [
    {
      label: <>
        <span className='username'>{userInf.name}</span>
        <Avatar size={40} src={`${BASE_URL}${userInf.pic}`} />
      </>,
      key: 'center',
      children: [
        {
          label: '基本设置',
          key: 'settings',
        },
        {
          label: '我的消息',
          key: 'messages',
        },
        {
          label: '我的主页',
          key: 'home',
        },
        {
          label: '安全退出',
          key: 'exit',
        },
      ]
    },
  ], [userInf.username, userInf.pic]);

  return (
    <PublicHeaderWrapper>
      <div className="logo">
        <CloudSyncOutlined />WeShare
      </div>
      <div className="login-area">
        {
          isLogin
            ? <Menu
              theme="dark"
              mode="horizontal"
              items={menuConfigIsLogIn}
              onClick={handleMenuClickIsLogIn}
            />
            : <Menu
              theme="dark"
              mode="horizontal"
              onClick={handleMenuClickIsNotLogIn}
              items={menuConfigIsNotLogIn}
            />
        }

      </div>
    </PublicHeaderWrapper>
  );
}
export default PublicHeader;

