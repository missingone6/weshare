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
export {
  getLitsAction,
  getTopWeekAction,
  getTipsAction,
  getLinksAction,
}