import service from '../service/request';

const getCaptchaAction = async (params) => await service.get('/api/public/getCaptcha', params)
const loginAction = async (params) => await service.post('/api/users/login', params)

export {
  getCaptchaAction,
  loginAction
}