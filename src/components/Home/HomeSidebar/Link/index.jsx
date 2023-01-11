import { Button } from 'antd';
import LinkWrapper from './style';

const Link = () => {

  return (
    <LinkWrapper>
      <div className="link-header">友情链接</div>
      <div className="link-content">
        <Button type="link">baidu</Button>
        <Button type="link">alibaba</Button>
      </div>
    </LinkWrapper>
  );
}
export default Link;

