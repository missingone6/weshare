import { Layout } from 'antd';
import { useMatch } from "react-router-dom";
import HomeWrapper from './style';
import HomeHeader from './HomeHeader';
import HomeContent from './HomeContent';
import HomeSidebar from './HomeSidebar';
const { Header, Content } = Layout;

const Home = () => {
  const match = useMatch('/home/:catalog');

  return (
    <HomeWrapper>
      <Header
        style={{
          background: "white",
          height: "48px",
          width: "100vw",
          overflow: "hidden"
        }}>
        <HomeHeader catalog={match.params.catalog} />
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
            <HomeContent catalog={match.params.catalog} />
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

