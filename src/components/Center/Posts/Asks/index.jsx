import { Table, Button } from 'antd';
import AsksWrapper from './style';
const columns = [
  {
    title: '帖子标题',
    dataIndex: 'title',
  },
  {
    title: '结贴',
    dataIndex: 'isEnd',
  },
  {
    title: '发表时间',
    dataIndex: 'created',
  },
  {
    title: '阅读次数',
    dataIndex: 'reads',
  },
  {
    title: '回答次数',
    dataIndex: 'answer',
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <>
        <Button type="primary" size='small' className='mr10'>
          编辑
        </Button>
        <Button type="primary" danger size='small'>
          删除
        </Button>
      </>

    ),
  },
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key:i,
    title: Array(Math.ceil(Math.random() * 10 + 50)).fill('1').join(''),
    isEnd: 1,
    created: '2022-10-10',
    reads: 1,
    answer: 2
  });
}
const Asks = () => {

  return (
    <AsksWrapper>
      <Table
        columns={columns}
        dataSource={data}
      />
    </AsksWrapper>
  );
}
export default Asks;