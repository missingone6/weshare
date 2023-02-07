import { Table, Button, message } from 'antd';
import AsksWrapper from './style';
import { useState, useEffect } from 'react';
import { getPostsByUidAction } from '../../../../api/user';
import { formatTime } from '../../../../utils';
import { useNavigate } from 'react-router-dom';

const columns = [
  {
    title: '帖子标题',
    dataIndex: 'title',
  },
  {
    title: '结贴',
    dataIndex: 'isEnd',
    render: (text) => text == '0' ? "未结帖" : "已结帖"
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
        <Button type="link" danger size='small' className='mr10' onClick={(e) => {
          // todo
          e.stopPropagation()
        }}>
          删除
        </Button>
        <Button type="primary" size='small' >
          查看
        </Button>
      </>

    ),
  },
];

const Asks = () => {

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // 总条数
  const [total, setTotal] = useState(0);
  // 当前页码
  const [current, setCurrent] = useState(1);
  // 每页数据条数
  const [pageSize, setPageSize] = useState(10);


  const fetchData = async () => {
    setLoading(true);
    const { data, code, msg, total } = await getPostsByUidAction({
      page: current - 1,
      limit: pageSize
    });
    if (code === 200) {
      setData(data.map((item) => {
        const { _id, title, isEnd, created, reads, answer } = item;
        return {
          key: _id,
          title,
          isEnd,
          created: formatTime(created),
          reads,
          answer
        }
      }));
      setTotal(total);
    } else {
      message.open({
        type: 'error',
        content: msg,
      });
    }
    setLoading(false);
  }
  const handleOnChange = (page, pageSize) => {
    setPageSize(pageSize);
    setCurrent(page);
  }

  useEffect(() => {
    fetchData();
  }, [current, pageSize])

  return (
    <AsksWrapper>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          current,
          pageSize,
          total,
          onChange: handleOnChange,
          showSizeChanger: true
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              navigate(`/question/${record.key}`);
            },
          };
        }}
        style={{
          cursor: "pointer"
        }}
      />
    </AsksWrapper>
  );
}
export default Asks;