import { Layout } from 'antd';
import HomeWrapper from './style';
import HomeHeader from './HomeHeader';
import HomeContent from './HomeContent';
import HomeSidebar from './HomeSidebar';
const { Header, Content } = Layout;

const Home = () => {
  return (
    <HomeWrapper>
      <Header
        style={{
          background: "white",
          height: "48px",
          width: "100vw"
        }}>
        <HomeHeader />
      </Header>
      <Content
        style={{
          width: "1152px",
          margin: 'auto',
        }}
      >
        <div
          className="site-layout-content"
          style={{
            display: "flex",
            marginTop: "10px",
          }}
        >
          <div style={{
            width: "800px",
            // border: "2px solid black"
          }}>
            <HomeContent />
          </div>
          <div style={{
            marginLeft: "20px",
            width: "352px",
          }}>
            <HomeSidebar />
          </div>
        </div>
      </Content>
    </HomeWrapper>
  );
}
export default Home;

