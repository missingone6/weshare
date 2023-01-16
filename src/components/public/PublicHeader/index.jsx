import { Menu, Avatar } from 'antd';
import { CloudSyncOutlined } from '@ant-design/icons';
import PublicHeaderWrapper from './style';
import { useNavigate } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../../service/config'
const menuConfigIsLogin = [
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
  const { userInf, isLogin } = useSelector(state => state.user)

  const handleMenuClickIsLogIn = useCallback((e) => {
    navigate(`/${e.key}`)
  }, []);
  const menuConfigIsNotLogIn = useMemo(() => [
    {
      label: <>
        <span className='username'>{userInf.name}</span>
        <Avatar size={40} src={`${BASE_URL}${userInf.pic}`} />
      </>,
      key: 'mail',
      children: [
        {
          label: '基本设置',
          key: '0',
        },
        {
          label: '我的消息',
          key: '1',
        },
        {
          label: '我的主页',
          key: '2',
        },
        {
          label: '安全退出',
          key: '3',
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
              // onClick={handleMenuClickLogIn}
              items={menuConfigIsNotLogIn}
            />
            : <Menu
              theme="dark"
              mode="horizontal"
              onClick={handleMenuClickIsLogIn}
              items={menuConfigIsLogin}
            />
        }

      </div>
    </PublicHeaderWrapper>
  );
}
export default PublicHeader;

