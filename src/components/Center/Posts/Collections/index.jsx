import { Table, Button } from 'antd';
import CollectionsWrapper from './style';
const columns = [
  {
    title: '帖子标题',
    dataIndex: 'title',
    render: (text) => <div className="title">{text}</div>
  },
  {
    title: '收藏时间',
    dataIndex: 'time',
  },
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key:i,
    title: '有哪些仅仅一句，就能让你落泪的话？',
    time: '2022-10-10',
  });
}
const Collections = () => {

  return (
    <CollectionsWrapper>
      <Table
        columns={columns}
        dataSource={data}
      />
    </CollectionsWrapper>
  );
}
export default Collections;