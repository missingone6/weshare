import { Layout } from 'antd';
import { useMatch } from "react-router-dom";
import StyleWrapper from './style';
import PublicMenuHeader from '../public/PublicMenuHeader';
import QuestionsContent from './QuestionsContent';
import QuestionsSidebar from './QuestionsSidebar';
const { Header, Content } = Layout;


const Questions = () => {
  const match = useMatch('/question/:pid');

  return (
    <StyleWrapper>
      <Header
        style={{
          background: "white",
          height: "48px",
          width: "100vw",
          overflow: "hidden"
        }}>
        <PublicMenuHeader />
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
          }}>
            <QuestionsContent pid={match.params.pid} />
          </div>
          <div style={{
            marginLeft: "20px",
            width: "352px",
          }}>
            <QuestionsSidebar />
          </div>
        </div>
      </Content>
    </StyleWrapper>
  );
}
export default Questions;

