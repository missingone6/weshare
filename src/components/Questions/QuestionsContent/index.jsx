import StyleWrapper from './style';
import Post from './Post';
import Reply from './Reply';
import CommentsEditor from './CommentsEditor';


const QuestionsContent = ({ pid }) => {

  return (
    <StyleWrapper>
      <Post pid={pid} />
      <Reply pid={pid} />
      <CommentsEditor pid={pid} />
    </StyleWrapper>
  );
}
export default QuestionsContent;


