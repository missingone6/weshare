
import { Tabs } from 'antd';
import { useLocation } from 'react-router-dom';
import Asks from './Asks';
import Collections from './Collections';

const tabsConfig = [
  {
    key: 'asks',
    label: `我的发帖`,
    children: <Asks />,
  },
  {
    key: 'collections',
    label: `我收藏的帖子`,
    children: <Collections />,
  },
];

const Posts = () => {
  const location = useLocation();
  return (
    <Tabs defaultActiveKey={location.state === '' ? "asks" : location.state} items={tabsConfig} />
  );
};

export default Posts;