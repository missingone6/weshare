import { Layout, Menu } from 'antd';
import { CloudSyncOutlined } from '@ant-design/icons';
import { Outlet, useLocation } from 'react-router-dom';
import IndexWrapper from './style';
import PublicHeader from '../public/PublicHeader'
import PublicFooter from '../public/PublicFooter'

const { Header, Content, Footer } = Layout;
const Index = () => {
  const location = useLocation();
  return (
    <IndexWrapper>
      <Layout className="layout">
        <Header>
          <PublicHeader />
        </Header>

        <Content
          style={{
            minWidth: "1152px",
            margin: location.pathname?.split('/')[1] === 'center' ? 0 : 'auto',
          }}
        >
          <Outlet />
        </Content>

        <Footer>
          <PublicFooter />
        </Footer>
      </Layout>
    </IndexWrapper>
  );
}
export default Index;

