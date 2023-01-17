import { Tabs } from 'antd';
import { useCallback } from 'react';
import Profile from './Profile';
import UploadPhoto from './UploadPhoto';
import ChangePassword from './ChangePassword';

const items = [
  {
    key: 'profile',
    label: `我的资料`,
    children: <Profile />,
  },
  {
    key: 'upload_photo',
    label: `头像`,
    children: <UploadPhoto />,
  },
  {
    key: 'change_password',
    label: `密码`,
    children: <ChangePassword />,
  },
];

const Home = () => {
  const onChange = useCallback((key) => {
    console.log(key);
  }, [])

  return (
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  );
}
export default Home;

