import MyListWrapper from './style';
import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton, Tag, Space } from 'antd';
import { BulbOutlined, MessageOutlined } from '@ant-design/icons';
const count = 7;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const MyList = ({ header, className }) => {

  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat([...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} }))),
    );
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      });
  };

  // const loadMore =
  //   !initLoading && !loading ? (
  //     <div
  //       style={{
  //         textAlign: 'center',
  //         marginTop: 12,
  //         height: 32,
  //         lineHeight: '32px',
  //       }}
  //     >
  //       <Button onClick={onLoadMore}>loading more</Button>
  //     </div>
  //   ) : null;
  return (
    <MyListWrapper>
      <List
        header={header}
        className={className}
        loading={initLoading}
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[<a key="list-loadmore-more"><MessageOutlined />88</a>]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={
                  <>
                    <Tag color="green">动态</Tag>
                    <a href="https://ant.design">{item.name?.last}</a>
                  </>
                }
                description={(
                  <Space size="small">
                    <span>姓名</span>
                    <span><Tag color="#f50">VIP</Tag></span>
                    <span>刚刚</span>
                    <span><Tag icon={<BulbOutlined />} color="red">60</Tag></span>
                    <span><Tag color="#4bde0b">已结</Tag></span>
                  </Space>
                )}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </MyListWrapper>
  );
}
export default MyList;


