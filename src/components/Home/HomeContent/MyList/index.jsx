import MyListWrapper from './style';
import React, { useEffect, useState } from 'react';
import { Avatar, Divider, List, Skeleton, Tag, Space } from 'antd';
import { BulbOutlined, MessageOutlined } from '@ant-design/icons';
import { getLitsAction } from '../../../../api/content';
import { fromTime } from '../../../../utils'
import { BASE_URL } from '../../../../service/config';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';


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

const MyList = ({ header, className, catalog, isTop, isEnd, sort, key }) => {
  //  分页第几页
  const [pageSize, setPageSize] = useState(0);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const result = await getLitsAction({
      isTop,
      catalog,
      limit,
      page: pageSize,
      isEnd,
      sort
    })
    const { code, total } = result;
    if (code === 200) {
      setPageSize(pageSize + 1);
      setData([...data, ...result.data]);
      setTotal(total);
    }
    setLoading(false);
  }

  const goQuestionPage = (id) => navigate(`/question/${id}`);

  useEffect(() => {
    loadMoreData();
  }, [catalog, isEnd, sort]);

  return (
    !(total === 0 && isTop === '1')
    && <MyListWrapper>
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < total}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: skeletonNumber,
            }}
            active
          />
        }
        endMessage={isTop == '0' && <Divider plain>没有更多了🤐</Divider>}
      >
        <List
          key={key}
          header={header}
          className={className}
          itemLayout="horizontal"
          dataSource={data}
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
      </InfiniteScroll>
    </MyListWrapper >
  );
}
export default MyList;


