import StyleWrapper from './style';
import { Tag, Avatar, Button, message } from 'antd';
import { useState, useEffect } from 'react';
import { EyeOutlined, CommentOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import { getDetailListAction } from '../../../../api/content';
import { BASE_URL } from '../../../../service/config';
import { fromTime } from '../../../../utils';
import { tagConfig } from '../../../Home/HomeContent/MyList';
import { setOrCancelCollectAction } from '../../../../api/user';

const Post = ({ pid }) => {

  const [data, setData] = useState({});

  const fetchData = async () => {
    const result = await getDetailListAction({ pid });
    const { code, msg, data } = result;
    if (code === 200) {
      setData(data);
    } else {
      message.open({
        type: 'error',
        content: msg,
      });
    }
  }
  // 收藏/取消收藏
  const setPostCollect = async () => {
    const result = await setOrCancelCollectAction({ pid });
    if (result.code === 200) {
      console.log(data);
      setData({
        ...data,
        isCollect: result.isCollect
      })
    }
  }
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <StyleWrapper>
      <div className="post-header">
        <div className="post-title">{data.title}</div>
        <div className="post-header-content">
          <div className="tags">
            <Tag color={tagConfig[data.catalog]?.color}>
              {tagConfig[data.catalog]?.name}
            </Tag>
          </div>
          <div className="status">
            <div className="comments">
              <CommentOutlined />{data.answer}
            </div>
            <div className="read">
              <EyeOutlined />{data.reads}
            </div>
            <div className="like" onClick={setPostCollect}>
              {
                data.isCollect == '0'
                  ? <><StarOutlined /><span>收藏</span></>
                  : <><StarFilled className="red" /><span>已收藏</span></>
              }
            </div>
          </div>
        </div>

      </div>

      <div className="post-user">
        <div className="user-box">
          <div className="photo">
            <Avatar size={50} src={`${BASE_URL}${data.uid?.pic}`} />
          </div>
          <div className="user-box-content">
            <div>
              <span className="name">{data.uid?.name}</span>
              {
                data.uid?.isVip == '1'
                && <span><Tag color="#f50">VIP</Tag></span>
              }
              <span className='time'>{fromTime(data.created)}</span>
            </div>
            <div className="favs">悬赏:{data.favs}积分</div>
          </div>
        </div>
        <div className="action-box">
          <Button type="link">删除</Button>
        </div>
      </div>

      <div
        className="post-content"
        dangerouslySetInnerHTML={{
          __html: data.content
        }}
      />
    </StyleWrapper >
  );
}
export default Post;


