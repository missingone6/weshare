import { Space } from 'antd';
import Link from '../../public/PublicSidebar/Link';
import Sign from '../../public/PublicSidebar/Sign';
import HotTopic from '../../public/PublicSidebar/HotTopic';
import Tips from '../../public/PublicSidebar/Tips';


const QuestionsSidebar = () => {

  return (
    <Space size="small" direction='vertical' style={{ width: "100%" }}>
      <Tips />
      <Sign />
      <HotTopic />
      <Link />
    </Space>
  );
}
export default QuestionsSidebar;

