import service from '../service/request';

// 查询文章列表接口
const getLitsAction = async (params) => {
  return await service.get('/api/public/lists', {
    params
  })
}
// 查询本周热议接口
const getTopWeekAction = async () => {
  return await service.get('/api/public/topWeek')
}

// 查询温馨提示接口
const getTipsAction = async () => {
  return await service.get('/api/public/tips')
}

// 查询温馨提示接口
const getLinksAction = async () => {
  return await service.get('/api/public/links')
}

// 图片上传（头像上传）
const uploadPhotoAction = async (formData) => {
  return await service.post('/api/users/photo', formData, {
    "Content-Type": "'multipart/form-data"
  })
}


// 发表新帖
const addPostsAction = async (params) => {
  return await service.post('/api/content/posts', params)
}

// 查询文章详情（帖子详情）
const getDetailListAction = async (params) => {
  return await service.get('/api/public/list', {
    params
  })
}
export {
  getLitsAction,
  getTopWeekAction,
  getTipsAction,
  getLinksAction,
  uploadPhotoAction,
  addPostsAction,
  getDetailListAction,
}