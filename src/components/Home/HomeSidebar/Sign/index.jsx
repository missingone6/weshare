import { useState } from 'react';
import { Button, Menu } from 'antd';
import SignWrapper from './style';
const menuConfig = [
  {
    label: '签到',
    key: '0',
  },
  {
    label: '说明',
    key: '1',
  },
  {
    label: '活跃榜',
    key: '2',
  },
]
const Sign = ({ border }) => {
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <SignWrapper border>
      <div className="sign-header">
        <div className='left'>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={menuConfig}
            style={{
              height: "38px"
            }}
          />
        </div>
        <div className='right'>
          已连续签到<span className='red'>5</span>天
        </div>
      </div>
      <div className="sign-content">
        <div className="sign-content-area">
          <Button type="primary">今日签到</Button>
          <span>
            可获得<span className='red'>5</span>经验值
          </span>
        </div>
      </div>
    </SignWrapper>
  );
}
export default Sign;

