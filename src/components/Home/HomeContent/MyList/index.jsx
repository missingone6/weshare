import MyListWrapper from './style';
import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton, Tag, Space } from 'antd';
import { BulbOutlined, MessageOutlined } from '@ant-design/icons';
import { getLitsAction } from '../../../../api/content';
import { fromTime } from '../../../../utils'
import { BASE_URL } from '../../../../service/config';
import { useNavigate } from 'react-router-dom';
// 分页，每次加载20个
const limit = 20;
// 点击加载更多，loading状态时页面显示骨架屏的个数
const skeletonNumber = 1;
export const tagConfig = {
  index: {
    name: "首页",
    color: "green"
  },
  ask: {
    name: "提问",
    color: "magenta"
  },
  advise: {
    name: "建议",
    color: "gold"
  },
  discuss: {
    name: "交流",
    color: "lime"
  },
  share: {
    name: "分享",
    color: "geekblue"
  },
  logs: {
    name: "动态",
    color: "purple"
  },
  notice: {
    name: "公告",
    color: "cyan"
  },
}

const MyList = ({ header, className, catalog, isTop, isEnd, sort }) => {
  // 第几页
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const [initLoading, setInitLoading] = useState(true);
  // 防止在网速慢的情况下，用户多次点击加载更多按钮造成的页面重复渲染。类似于一个请求锁
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchData = async ({ data, page }) => {
    const result = await getLitsAction({
      isTop,
      catalog,
      limit,
      page,
      isEnd,
      sort
    })
    const newData = data.concat(result.data);
    setData(newData);
    setList(newData);
    setInitLoading(false);
    setPage(page + 1);
    setTotal(result.total)
  }

  const goQuestionPage = (id) => navigate(`/question/${id}`);
  
  useEffect(() => {
    // 当catalog发生改变时,比如页面url从/home/index变成/home/ask,page参数应传0，因为MyList组件会复用。
    fetchData({
      page: 0,
      data: [],
    });
  }, [catalog, isEnd, sort]);


  const onLoadMore = async () => {
    setLoading(true);
    setList(
      data.concat([...new Array(skeletonNumber)].map(() => ({ loading: true, tags: [], catalog: "index", uid: {} }))),
    );
    await fetchData({ data, page });
    setLoading(false);
    // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
    // In real scene, you can using public method of react-virtualized:
    // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
    window.dispatchEvent(new Event('resize'));
  };

  const loadMore =
    !initLoading
      && !loading
      && (page * limit) < total
      ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={onLoadMore}>点我加载更多</Button>
        </div>
      ) : null;

  return (
    <MyListWrapper>
      {
        (total !== 0 || isTop === '0') &&
        <List
          header={header}
          className={className}
          loading={initLoading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={list}
          locale={{ emptyText: "快去发表第一条帖子吧！" }}
          style={{ marginBottom: "10px" }}
          renderItem={(item) => {
            const { uid: user } = item;
            return (
              <List.Item
                className='list-item'
                actions={[
                  ...item?.tags?.map(({ name, class: color }) =>
                    <Tag color={color || "#87d068"}>{name}</Tag>
                  ),
                  <div className='list-item-favs'><MessageOutlined />{item.answer}</div>,
                ]}
                onClick={goQuestionPage.bind(null, item._id)}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={<Avatar src={`${BASE_URL}${user.pic}`} />}
                    title={
                      <>
                        <Tag color={tagConfig[item.catalog].color}>
                          {tagConfig[item.catalog].name}
                        </Tag>
                        <span className='list-item-title'>{item.title}</span>
                      </>
                    }
                    description={(
                      <Space size="small">
                        <span>{user.name}</span>
                        {
                          item.isVip &&
                          <span><Tag color="#f50">VIP</Tag></span>
                        }
                        <span>{fromTime(item.created)}</span>
                        {
                          item.favs != 0 &&
                          <span><Tag icon={<BulbOutlined />} color="red">{item.favs}</Tag></span>
                        }
                        {
                          item.isEnd == 1 &&
                          <span><Tag color="#4bde0b">已结</Tag></span>
                        }
                      </Space>
                    )}
                  />
                </Skeleton>
              </List.Item>
            )
          }
          }
        >
        </List>
      }

    </MyListWrapper>
  );
}
export default MyList;


