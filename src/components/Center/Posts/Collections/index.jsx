import { Table, message } from 'antd';
import CollectionsWrapper from './style';
import { useState, useEffect } from 'react';
import { getPostsByCollectingAction } from '../../../../api/user';
import { formatTime } from '../../../../utils';
import { useNavigate } from 'react-router-dom';

const columns = [
  {
    title: '帖子标题',
    dataIndex: 'title',
    render: (text) => <div className="title">{text}</div>
  },
  {
    title: '收藏时间',
    dataIndex: 'created',
  },
];


const Collections = () => {

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
    const { data, code, msg, total } = await getPostsByCollectingAction({
      page: current - 1,
      limit: pageSize
    });
    if (code === 200) {
      setData(data.map((item) => {
        const { pid, title, created } = item;
        return {
          key: pid,
          title,
          created: formatTime(created),
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
    <CollectionsWrapper>
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
    </CollectionsWrapper>
  );
}
export default Collections;