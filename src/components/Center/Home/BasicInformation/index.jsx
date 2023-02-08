import { Button, message, Modal, Avatar } from 'antd';
import StyleWrapper from './style';
import { useState, useEffect } from 'react';
import { getBasicUserInfAction, getPostsByUidAction } from '../../../../api/user';
import { formatTime } from '../../../../utils';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL } from '../../../../service/config';
import {
  ManOutlined,
  WomanOutlined,
  FieldTimeOutlined,
  BulbOutlined,
} from '@ant-design/icons';
import { setUserInf } from '../../../../store/features/userSlice';

const BasicInformation = () => {
  const { userInf } = useSelector(state => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [user, setUser] = useState({});



  const fetchData = async () => {
    const { code, data, msg } = await getBasicUserInfAction();
    if (code === 200) {
      dispatch(setUserInf({
        ...userInf,
        ...data
      }));
      setUser(data)
    } else {
      message.open({
        type: 'error',
        content: msg,
      });
    }
  }


  useEffect(() => {
    fetchData();
  }, [])

  return (
    <StyleWrapper>
      <div className="basicInf-box">
        <div className="avatar">
          <Avatar size={64} src={`${BASE_URL}${user.pic}`} />
        </div>
        <div className='name'>{user.name}</div>
        <div className='otherInf'>
          <span className="favs">
            <BulbOutlined />
            {user.favs} 积分
          </span>
          <span className="created"><FieldTimeOutlined />
            {formatTime(user.created)} 加入
          </span>
          <span className="gender">{
            user.gender === '0' ? <WomanOutlined className='red' /> : <ManOutlined className='blue' />
          }</span>
        </div>
        <div className="regmark">
          {user.regmark}
        </div>
        <div className="btn">
          <Button type="default">加为好友</Button>
          <Button type='primary'>发起对话</Button>
        </div>
      </div>
    </StyleWrapper>
  );
}
export default BasicInformation;