import service from '../service/request';

// 添加评论接口
const addCommentsAction = async (params) => {
  return await service.post('/api/comments', params)
}

// 评论列表接口
const getCommentsAction = async (params) => {
  return await service.get('/api/public/comments', {
    params
  })
}

// 评论点赞、评论取消点赞
const setCommentsLikesAction = async (params) => {
  return await service.post('/api/comments/voters', params)
}

export {
  addCommentsAction,
  getCommentsAction,
  setCommentsLikesAction,
}