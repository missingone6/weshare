import { useEffect,  useState } from 'react';
import { Timeline, Divider, Skeleton } from 'antd';
import { getCommentsByUidAction } from '../../../../api/comments';
import StyleWrapper from './style';
import { fromTime } from '../../../../utils';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

// 分页每次获取页数限制
const limit = 10;

const Reply = () => {
  const { userInf } = useSelector(state => state.user)
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  //  分页第几页
  const [pageSize, setPageSize] = useState(0);
  const navigate = useNavigate();

  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const result = await getCommentsByUidAction({
      page: pageSize,
      limit
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
  }, []);

  return (
    <StyleWrapper>
      <div className='reply-header'>
        <span className="name">{userInf.name}</span>
        的最新回帖
      </div>
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < total}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain>没有更多了🤐</Divider>}
      >
        <Timeline>
          {
            data.map((item) => {
              const { _id, content, created, pid } = item;
              return (
                <Timeline.Item color="#00CCFF" key={_id}>
                  <div>
                    <span className="time">{fromTime(created)}</span>
                    &nbsp;在&nbsp;
                    {
                      pid !== null
                        ? <span className='title pointer' onClick={goQuestionPage.bind(null, pid._id)}>{pid.title}</span>
                        : <span className='title'>(用户已删除该帖子)</span>
                    }
                    &nbsp;中回答
                  </div>
                  <div className="content" dangerouslySetInnerHTML={{
                    __html: content
                  }}>
                  </div>
                </Timeline.Item>
              )
            })
          }
        </Timeline>
      </InfiniteScroll>





    </StyleWrapper>
  )
}
export default Reply;