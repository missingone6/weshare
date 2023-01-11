import { Menu, Input, Button } from 'antd';
import HomeHeaderWrapper from './style';

const { Search } = Input;
const menuConfig1 = [
  {
    label: '首页',
    key: 'index',
  },
  {
    label: '提问',
    key: 'ask',
  },
  {
    label: '建议',
    key: 'advise',
  },
  {
    label: '交流',
    key: 'discuss',
  },
  {
    label: '分享',
    key: 'share',
  },
  {
    label: '动态',
    key: 'logs',
  },
  {
    label: '公告',
    key: 'notice',
  },
]
const menuConfig2 = [
  {
    label: '我发表的帖',
    key: '1',
  },
  {
    label: '我收藏的帖',
    key: '2',
  },
]
const HomeHeader = () => {
  const onSearch = (value) => {
    console.log(value)
  };
  return (
    <HomeHeaderWrapper>
      <div className='nav-area'>
        <Menu
          style={{
            height: "48px",
          }}
          mode="horizontal"
          defaultSelectedKeys={['index']}
          items={menuConfig1}
        />
      </div>
      <div className='nav-my-area'>
        <Menu
          style={{
            height: "48px",
          }}
          mode="horizontal"
          items={menuConfig2}
        />
      </div>
      <div className='search-area'>
        <Search
          placeholder="请输入关键字"
          onSearch={onSearch}
          style={{
            width: 200,
          }}
        />
        <Button type="primary" className='ml15'>发表新帖</Button>
      </div>
    </HomeHeaderWrapper>
  );
}
export default HomeHeader;

