import service from '../service/request';

const getCaptchaAction = async (params) => await service.get('/api/public/getCaptcha', params)
const loginAction = async (params) => await service.post('/api/login/login', params)
const registerAction = async (params) => await service.post('/api/login/register', params)

// 用户找回密码
const forgetPasswordAction = async (params) => {
  return await service.patch('/api/login/password', params);
}

// 用户验证注册接口
const verifyRegisterAction = async (params) => {
  return await service.post('/api/verify/register', params);
}

export {
  getCaptchaAction,
  loginAction,
  registerAction,
  forgetPasswordAction,
  verifyRegisterAction,
}