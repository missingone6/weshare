import { Layout, message } from 'antd';
import { useMatch, Navigate, useNavigate, useLocation, useNavigationType } from "react-router-dom";
import HomeWrapper from './style';
import HomeHeader, { menuConfig1 } from '../public/PublicMenuHeader';
import HomeContent from './HomeContent';
import HomeSidebar from './HomeSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { scrollToView } from '../../utils/scrollToView';
const { Header, Content } = Layout;

const catalogArray = menuConfig1.map(item => item.key);

const Home = () => {
  const match = useMatch('/home/:catalog');


  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const scroll = useSelector(state => state.scroll)




  useEffect(() => {
    if (scroll.scrollKey === location.key) {
      console.log('===================马上定位到', scroll.scrollData);
      scrollToView(scroll.scrollData);
      message.open({
        type: 'success',
        content: '已为您定位到上次访问的地方',
      });
      console.log('=======定位好了', document.documentElement.scrollTop)
    }
  }, []);




  if (!catalogArray.includes(match.params.catalog)) {
    return <Navigate to="/home/index" />
  }

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

