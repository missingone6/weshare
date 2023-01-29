import { Col, Row } from 'antd';
import UserWrapper from './style';
import { useSelector } from 'react-redux';
import Sign from '../../Home/HomeSidebar/Sign'
import { SettingOutlined } from '@ant-design/icons';
const User = () => {
  const { userInf } = useSelector(state => state.user)

  return (
    <UserWrapper>
      <Row>
        <Col span={24} className="title">
          Hi,{userInf.name}
          {
            userInf.isVip == 0 ? ",你已经是我们的会员了" : null
          }
        </Col>
      </Row>
      <Row className='member-sign-information' gutter={[5, 0]}>
        <Col span={12}>
          <Sign border={true} />
        </Col>
        <Col span={12} className='member-information'>
          <div className="member-header">
            我的会员信息
          </div>
          <div className="member-content">
            <div className="member-content-area">
              <div>积分经验值：<span className='red'>{userInf.favs}</span></div>
              <div>您当前为：<span className='red'>{userInf.isVip ? 'VIP' : '非VIP'}</span></div>
            </div>
          </div>
        </Col>
      </Row>
      <Row className='quick-information'>
        <Col span={24}>
          <Row>
            <Col span={24} className='title'>快捷方式</Col>
          </Row>
          {
            new Array(3).fill('').map((_, index) =>
              <Row key={index} gutter={[10, 20]} className='row'>
                <Col span={6} className='col-item'>
                  <div className='box'><SettingOutlined style={{ fontSize: '30px' }} /></div>
                  <div className='tips'>修改信息</div>
                </Col>
                <Col span={6} className='col-item'>
                  <div className='box'><SettingOutlined style={{ fontSize: '30px' }} /></div>
                  <div className='tips'>修改头像</div>
                </Col>
                <Col span={6} className='col-item'>
                  <div className='box'><SettingOutlined style={{ fontSize: '30px' }} /></div>
                  <div className='tips'>修改密码</div>
                </Col>
                <Col span={6} className='col-item'>
                  <div className='box'><SettingOutlined style={{ fontSize: '30px' }} /></div>
                  <div className='tips'>账号绑定</div>
                </Col>
              </Row>
            )
          }
        </Col>
      </Row>
    </UserWrapper>
  );
}
export default User;

