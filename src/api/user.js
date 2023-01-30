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

// 发送邮箱更新邮件
const sendmailAboutUsernameAction = async (params) => {
  return await service.post('/api/email/username', params);
}

// 用户邮箱更新
const usernameUpdateAction = async (params) => {
  return await service.patch('/api/users/username', params);
}
export {
  SignInAction,
  getFavsAction,
  sendmailAboutUsernameAction,
  usernameUpdateAction,
}