import MyListWrapper from './style';
import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton, Tag, Menu } from 'antd';
import { LikeOutlined, LikeFilled } from '@ant-design/icons';
import { fromTime } from '../../../../utils'
import { BASE_URL } from '../../../../service/config';
import { getCommentsAction, setCommentsLikesAction } from '../../../../api/comments';
// 分页，每次加载3个
const limit = 3;
// 点击加载更多，loading状态时页面显示骨架屏的个数
const skeletonNumber = 1;

const menuConfig = [
  {
    label: '按最新',
    key: 'created',
  },
  {
    label: '按最热',
    key: 'likes',
  },
]

const Reply = ({ pid }) => {
  // 第几页
  const [page, setPage] = useState(0);

  const [initLoading, setInitLoading] = useState(true);
  // 防止在网速慢的情况下，用户多次点击加载更多按钮造成的页面重复渲染。类似于一个请求锁
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedKeys, setSelectedKeys] = useState('likes');

  const fetchData = async ({ data, page, sort }) => {
    const result = await getCommentsAction({
      pid,
      limit,
      page,
      sort
    })
    if (result.code === 200) {
      const newData = data.concat(result.data);
      setData(newData);
      setList(newData);
      setInitLoading(false);
      setPage(page + 1);
      setTotal(result.total);
    }
  }
  // 评论点赞、评论取消点赞
  const setCommentsLikes = async (cid) => {
    const result = await setCommentsLikesAction({ cid });
    if (result.code === 200) {
      setData(
        data.map(item => {
          if (item._id === cid) {
            // 取消点赞
            if (result.status === '0') {
              item.likes -= 1;
              item.isLiked = '0'
            } else {
              // 点赞
              item.likes += 1;
              item.isLiked = '1'
            }
          }
          return item;
        })
      )
    }
  }

  const handleMenuClick = ({ key }) => {
    setSelectedKeys(key);
  }

  useEffect(() => {
    // 当pid发生改变时,比如页面url从/questions/123变成/questions/456,page参数应传0，因为组件会复用。
    fetchData({
      page: 0,
      data: [],
      sort: selectedKeys,
    });
  }, [pid, selectedKeys]);


  const onLoadMore = async () => {
    setLoading(true);
    setList(
      data.concat([...new Array(skeletonNumber)].map(() => ({ loading: true, tags: [], catalog: "index", uid: {} }))),
    );
    await fetchData({ data, page, sort: selectedKeys });
    setLoading(false);
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
        total !== 0 &&
        <List
          header={(
            <div className='list-header'>
              <div className='list-headerText'>{total}个回答</div>
              <Menu
                style={{
                  height: "48px",
                }}
                mode="horizontal"
                selectedKeys={[selectedKeys]}
                onClick={handleMenuClick}
                items={menuConfig}
              />
            </div>
          )}
          loading={initLoading}
          itemLayout="vertical"
          loadMore={loadMore}
          dataSource={list}
          locale={{ emptyText: "快去发表第一条回复吧！" }}
          renderItem={(item) => {
            return (
              <List.Item
                key={item._id}
                className='list-item'
                actions={[
                  <span onClick={setCommentsLikes.bind(null, item._id)}>
                    {
                      item.isLiked == '0'
                        ? <LikeOutlined />
                        : <LikeFilled className="red" />
                    }
                    {item.likes}
                  </span>,
                  <div className='edit'>编辑</div>,
                ]}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={<Avatar size={40} src={`${BASE_URL}${item.cuid?.pic}`} />}
                    title={
                      <>
                        <span className="name">{item.cuid?.name}</span>
                        {
                          item.cuid?.isVip == 0
                          && <span><Tag color="#f50">VIP</Tag></span>
                        }
                      </>
                    }
                    description={(
                      <span>{fromTime(item.created)}</span>
                    )}
                  />
                  <div dangerouslySetInnerHTML={{
                    __html: item.content
                  }} />
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
export default Reply;


