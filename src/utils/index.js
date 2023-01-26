import moment from 'moment';
import 'moment/locale/zh-cn';

/**
 * 根据对应时间显示几秒前、几分钟前、几天前
 * 超过10天显示具体时间
 * @param {Moment} time 时间
 */
const fromTime = (time) => {
  if (moment(time).isBefore(moment().subtract(10, 'd'))) {
    console.log(1)
    return moment(time).format('YYYY-MM-DD');
  }
  return moment(time).fromNow();
}


/**
 * 解析jwt
 * @param {string} token jsonwebtoken
 */
const parseJwt = (token) => {
  if (typeof token === 'string') {
    return JSON.parse(window.atob(token.split(".")[1]));
  }
  throw new Error('token必须为字符串')
}

/**
* 判断jwt是否过期
* @param {string} token jsonwebtoken
*/
const isJwtExpired = (token) => {
  if (moment().isBefore(moment(parseJwt(token).exp * 1000))){
    return false;
  }
  return true;
 
}
export {
  fromTime,
  parseJwt,
  isJwtExpired,
}