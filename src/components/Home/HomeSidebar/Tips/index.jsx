import TipsWrapper from './style';
import { List } from 'antd';
const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

const Tips = () => {
  
  return (
    <TipsWrapper>
      <List
        size="small"
        header="温馨提醒"
        split={false}
        dataSource={data}
        renderItem={(item) => <List.Item className='list-item'><a href='#'>{item}</a></List.Item>}
      />
    </TipsWrapper>
  );
}
export default Tips;

