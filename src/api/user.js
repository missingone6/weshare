import service from '../service/request';

// 用户签到接口
const SignInAction = async () => {
  return await service.patch('/api/users/fav')
}

// 用户积分查询接口
const getFavsAction = async (params) => {
  return await service.get('/api/users/fav', {
    params
  });
}

export {
  SignInAction,
  getFavsAction,
}