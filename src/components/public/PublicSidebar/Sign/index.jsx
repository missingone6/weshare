import { useState, useCallback, useEffect } from 'react';
import { Button, Drawer, Menu, Table, List, Avatar, message } from 'antd';
import SignWrapper from './style';
import DrawerExplain from './DrawerExplain';
import DrawerActiveList from './DrawerActiveList';
import { useDispatch, useSelector } from 'react-redux';
import { SignInAction } from '../../../../api/user';
import { setUserInf } from '../../../../store/features/userSlice';
import { USERINF } from '../../../../storage/config';
import localStorage from '../../../../storage/localStorage';
import { compareTimeBelongToTheSameDay } from '../../../../utils';

const menuConfig = [
  {
    label: '签到',
    key: 'signIn',
  },
  {
    label: '说明',
    key: 'explain',
  },
  {
    label: '活跃榜',
    key: 'activeList',
  },
];


const Sign = ({ border }) => {
  const { userInf, isLogin } = useSelector(state => state.user)

  const dispatch = useDispatch()
  const [current, setCurrent] = useState('signIn');
  const [isSignIn, setIsSignIn] = useState(() => {
    const { isSignIn, lastSignIn } = userInf;
    // 根据lastSignIn判断是否需要更新isSignIn。
    // 因为isSignIn是从localStorage里读的，所以可能会遇到隔天签到但是isSignIn没有刷新的问题
    if (lastSignIn) {
      if (!compareTimeBelongToTheSameDay(lastSignIn)) {
        return false
      }
    }
    return isSignIn;
  });
  // 连续签到天数
  const [count, setCount] = useState(userInf.count);
  const [openExplain, setOpenExplain] = useState(false);
  const [openActiveList, setOpenActiveList] = useState(false);

  useEffect(() => {
    setCount(userInf.count)
  }, [userInf.count])

  const onClick = (e) => {
    setCurrent(e.key);
    switch (e.key) {
      case 'explain':
        setOpenExplain(true);
        break;
      case 'activeList':
        setOpenActiveList(true);
        break;
    }
  };

  // 本次签到获得积分数
  const favsThisTime = useCallback((count) => {
    let favs;
    if (count < 5) {
      favs = 5
    } else if (count < 15) {
      favs = 10
    } else {
      favs = 15
    }
    return favs;
  }, []);

  const handleSignInClick = async () => {
    const { code, favs, count, msg, lastSignIn } = await SignInAction()
    if (code === 200) {
      message.open({
        type: 'success',
        content: msg,
      });
      setIsSignIn(true);
      setCount(count);
      const newUserInf = {
        ...userInf,
        count,
        favs,
        isSignIn: true,
        lastSignIn,
      }
      dispatch(setUserInf(newUserInf));
      localStorage.setItem(USERINF, JSON.stringify(newUserInf))
    } else {
      message.open({
        type: 'error',
        content: msg,
      });
    }
  }

  return (
    <SignWrapper border={border}>
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
        {
          isLogin
          && <div className='right'>
            已连续签到<span className='red'>{count}</span>天
          </div>
        }
      </div>
      <div className="sign-content">
        <div className="sign-content-area">
          {
            isSignIn
              ?
              <>
                <Button disabled>今日已签到</Button>
                <span>
                  今日签到已获得<span className='red'>{favsThisTime(count)}</span>经验值
                </span>
              </>
              : <>
                <Button type="primary" onClick={handleSignInClick}>今日签到</Button>
                <span>
                  今日签到可获得<span className='red'>{favsThisTime(count)}</span>经验值
                </span>
              </>
          }
        </div>
      </div>
      <DrawerExplain
        open={openExplain}
        setOpen={setOpenExplain}
      />
      <DrawerActiveList
        open={openActiveList}
        setOpen={setOpenActiveList}
      />
    </SignWrapper>
  );
}
export default Sign;

