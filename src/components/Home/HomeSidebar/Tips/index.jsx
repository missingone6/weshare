import { useEffect, useState } from 'react';
import TipsWrapper from './style';
import { List } from 'antd';
import { getTipsAction } from '../../../../api/content';


const Tips = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const result = await getTipsAction()
    setData(result.data);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <TipsWrapper>
      <List
        size="small"
        header="温馨提醒"
        split={false}
        dataSource={data}
        renderItem={(item) => (
          <List.Item className='list-item'>
            <a href={`${item.link}`}>{item.title}</a>
          </List.Item>
        )}
      />
    </TipsWrapper>
  );
}
export default Tips;

