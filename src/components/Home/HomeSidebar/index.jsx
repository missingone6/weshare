import { Space } from 'antd';
import Link from './Link';
import Sign from './Sign';
import HotTopic from './HotTopic';
import Tips from './Tips';
import HomeSidebarWrapper from './style';


const HomeSidebar = () => {

  return (
    <HomeSidebarWrapper>
      <Space size="small" direction='vertical' style={{ width: "100%" }}>
        <Tips />
        <Sign />
        <HotTopic />
        <Link />
      </Space>
    </HomeSidebarWrapper>
  );
}
export default HomeSidebar;

