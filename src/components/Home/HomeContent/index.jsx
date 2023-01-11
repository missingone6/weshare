import HomeContentWrapper from './style';
import { Menu } from 'antd';
import MyList from './MyList';

const menuConfig1 = [
  {
    label: '综合',
    key: 'index',
  },
  {
    label: '已结',
    key: '1',
  },
  {
    label: '未结',
    key: '2',
  },
  {
    label: '精华',
    key: '3',
  },
]
const menuConfig2 = [
  {
    label: '按最新',
    key: '0',
  },
  {
    label: '按最热',
    key: '1',
  },
]
const HomeContent = () => {

  return (
    <HomeContentWrapper>
      <MyList header={<div className='header1'>置顶</div>}></MyList>
      <MyList className='my-list2' header={(<div className='header2'>
        <div className='nav-area1'>
          <Menu
            style={{
              height: "48px",
            }}
            mode="horizontal"
            defaultSelectedKeys={['index']}
            items={menuConfig1}
          />
        </div>
        <div className='nav-area2'>
          <Menu
            style={{
              height: "48px",
            }}
            mode="horizontal"
            items={menuConfig2}
          />
        </div>
      </div>)}></MyList>
    </HomeContentWrapper>
  );
}
export default HomeContent;


