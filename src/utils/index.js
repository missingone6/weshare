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


export {
  fromTime
}