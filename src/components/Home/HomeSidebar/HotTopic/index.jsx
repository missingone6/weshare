import HotTopicWrapper from './style';
import { List } from 'antd';
import { MessageOutlined } from '@ant-design/icons';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

const HotTopic = () => {

  return (
    <HotTopicWrapper>
      <List
        size="small"
        header="本周热议"
        split={false}
        dataSource={data}
        renderItem={(item) =>
          <List.Item className='list-item'>
            <a href='#'>{item}</a>
            <span className='grey'><MessageOutlined />88</span>
          </List.Item>
        }
      />
    </HotTopicWrapper>
  );
}
export default HotTopic;

