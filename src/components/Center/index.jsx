import { FileOutlined, PieChartOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import CenterWrapper from './style';

const { Content, Sider } = Layout;
const getItem = (label, key, icon, children) => {
  return {
    key,
    icon,
    children,
    label,
  };
}
const menuConfig = [
  getItem('我的主页', 'home', <UserOutlined />),
  getItem('用户中心', 'user', <PieChartOutlined />),
  getItem('基本设置', 'settings', <SettingOutlined />),
  getItem('我的帖子', 'posts', <FileOutlined />),
  getItem('我的消息', 'messages', <SettingOutlined />),
];


const Center = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  console.log(location)
  return (
    <CenterWrapper>
      <Layout
        style={{
          minHeight: 'calc(100vh - 64px)'
        }}
      >
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <Menu
            theme='dark'
            defaultSelectedKeys={[location.pathname?.split('/')[2]]}
            mode="inline"
            items={menuConfig}
            onClick={({ key }) => navigate(`/center/${key}`)}
          />
        </Sider>
        <Layout className="site-layout">
          <Content
            style={{
              margin: '0 16px',
              minHeight: '100%',
            }}
          >
            <div
              style={{
                marginTop: 16,
                padding: 24,
                minHeight: '100%',
                background: colorBgContainer,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </CenterWrapper>
  );
}
export default Center;

