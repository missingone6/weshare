import { useState, useEffect } from 'react';
import HotTopicWrapper from './style';
import { List } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { getTopWeekAction } from '../../../../api/content';
import { useNavigate } from 'react-router-dom';

const HotTopic = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const result = await getTopWeekAction()
    setData(result.data);
  }

  useEffect(() => {
    fetchData();
  }, [])


  return (
    <HotTopicWrapper>
      <List
        size="small"
        header="本周热议"
        split={false}
        dataSource={data}
        renderItem={(item) =>
          <List.Item className='list-item' onClick={() => navigate(`/question/${item._id}`)}>
            <a href='#'>{item.title}</a>
            <span className='grey'><MessageOutlined />{item.answer}</span>
          </List.Item>
        }
      />
    </HotTopicWrapper>
  );
}
export default HotTopic;

