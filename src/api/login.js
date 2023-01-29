import service from '../service/request';

const getCaptchaAction = async (params) => await service.get('/api/public/getCaptcha', params)
const loginAction = async (params) => await service.post('/api/login/login', params)
const registerAction = async (params) => await service.post('/api/login/register', params)

export {
  getCaptchaAction,
  loginAction,
  registerAction,
}