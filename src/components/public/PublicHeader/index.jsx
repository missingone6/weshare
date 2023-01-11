import { Menu } from 'antd';
import { CloudSyncOutlined } from '@ant-design/icons';
import PublicHeaderWrapper from './style';
import { useNavigate } from 'react-router-dom';
const menuConfig = [
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
  const onClick = (e) => {
    navigate(`/${e.key}`)
  };
  return (
    <PublicHeaderWrapper>
      <div className="logo">
        <CloudSyncOutlined />WeShare
      </div>
      <div className="login-area">
        <Menu
          theme="dark"
          mode="horizontal"
          onClick={onClick}
          items={menuConfig}
        />
      </div>
    </PublicHeaderWrapper>
  );
}
export default PublicHeader;

