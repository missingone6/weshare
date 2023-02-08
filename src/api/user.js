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

// 发送密码更新邮件
const sendmailAboutPasswordAction = async (params) => {
  return await service.post('/api/email/password', params);
}

// 用户邮箱更新
const usernameUpdateAction = async (params) => {
  return await service.patch('/api/users/username', params);
}

// 用户重置密码
const passwordUpdateAction = async (params) => {
  return await service.patch('/api/users/password', params);
}

// 用户基本信息更新
const basicInfUpdateAction = async (params) => {
  return await service.patch('/api/users/basic', params);
}

// 查询用户基本信息
const getBasicUserInfAction = async (params) => {
  return await service.get('/api/users/basic', {
    params
  });
}

// 收藏/取消收藏接口
const setOrCancelCollectAction = async (params) => {
  return await service.post('/api/users/collect', params);
}

// 查询用户发贴记录(查询用户文章列表)
const getPostsByUidAction = async (params) => {
  return await service.get('/api/users/lists', {
    params
  });
}


// 查询用户发贴记录(查询用户文章列表)
const getPostsByCollectingAction = async (params) => {
  return await service.get('/api/users/collect', {
    params
  });
}

// 删除帖子
const deletePostsByUidAction = async (params) => {
  return await service.delete('/api/users/list', {
    params
  });
}

export {
  SignInAction,
  getFavsAction,
  sendmailAboutUsernameAction,
  usernameUpdateAction,
  sendmailAboutPasswordAction,
  passwordUpdateAction,
  basicInfUpdateAction,
  getBasicUserInfAction,
  setOrCancelCollectAction,
  getPostsByUidAction,
  getPostsByCollectingAction,
  deletePostsByUidAction,
}