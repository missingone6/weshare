import service from '../service/request';

// 查询文章列表接口
const getLitsAction = async (params) => {
  return await service.get('/api/public/lists', {
    params
  })
}
// 查询本周热议接口
const getTopWeekAction = async (params) => {
  return await service.get('/api/public/topWeek', {
    params
  })
}

export {
  getLitsAction,
  getTopWeekAction
}