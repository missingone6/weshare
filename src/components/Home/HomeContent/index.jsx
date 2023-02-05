import HomeContentWrapper from './style';
import { Menu } from 'antd';
import MyList from './MyList';
import { useState } from 'react';

const menuConfig1 = [
  {
    label: '综合',
    key: '',
  },
  {
    label: '已结',
    key: '1',
  },
  {
    label: '未结',
    key: '0',
  },
  {
    label: '精华',
    key: '3',
  },
]
const menuConfig2 = [
  {
    label: '按最新',
    key: 'created',
  },
  {
    label: '按最热',
    key: 'answer',
  },
]
const HomeContent = ({ catalog }) => {
  const [isEnd, setIsEnd] = useState('');
  const [sort, setSort] = useState('created');
  const handleMenu1Click = ({ key }) => {
    setIsEnd(key)
  }
  const handleMenu2Click = ({ key }) => {
    setSort(key)
  }
  return (
    <HomeContentWrapper>
      <MyList
        catalog={catalog}
        isTop="1"
        header={
          <div className='header1'>置顶</div>
        } />
      <MyList
        isTop="0"
        catalog={catalog}
        isEnd={isEnd}
        sort={sort}
        header={(<div className='header2'>
          <div className='nav-area1'>
            <Menu
              style={{
                height: "48px",
              }}
              mode="horizontal"
              defaultSelectedKeys={['']}
              onClick={handleMenu1Click}
              items={menuConfig1}
            />
          </div>
          <div className='nav-area2'>
            <Menu
              style={{
                height: "48px",
              }}
              mode="horizontal"
              defaultSelectedKeys={['created']}
              onClick={handleMenu2Click}
              items={menuConfig2}
            />
          </div>
        </div>)} />
    </HomeContentWrapper>
  );
}
export default HomeContent;


