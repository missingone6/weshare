import moment from 'moment';
import 'moment/locale/zh-cn';

/**
 * 根据对应时间显示几秒前、几分钟前、几天前
 * 超过10天显示具体时间
 * @param {Moment} time 时间
 */
const fromTime = (time) => {
  if (moment(time).isBefore(moment().subtract(10, 'd'))) {
    return moment(time).format('YYYY-MM-DD HH:mm:ss');
  }
  return moment(time).fromNow();
}

/**
 * 根据对应时间显示几秒前、几分钟前、几天前
 * 超过10天显示具体时间
 * @param {Moment} time 时间
 */
const formatTime = (time) => {
  return moment(time).format('YYYY-MM-DD HH:mm:ss');
}


/**
 * 判断传入时间和当前时间是否都属于同一天
 * @param {Moment} time 时间
 */
const compareTimeBelongToTheSameDay = (time1) => {
  if (moment(time1).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
    return true;
  }
  return false;
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
  if (moment().isBefore(moment(parseJwt(token).exp * 1000))) {
    return false;
  }
  return true;
}

/**
* 根据积分返回对应颜色
* @param {string} token jsonwebtoken
*/
const getColorByFavs = (favs) => {
  if (favs <= 5) {
    return '#87d068'
  } else if (favs <= 10) {
    return '#2db7f5'
  } else {
    return '#f50'
  }
}
export {
  fromTime,
  formatTime,
  parseJwt,
  isJwtExpired,
  compareTimeBelongToTheSameDay,
  getColorByFavs,
}