
import { Tabs } from 'antd';
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
  return (
    <Tabs defaultActiveKey="asks" items={tabsConfig} />
  );
};

export default Posts;