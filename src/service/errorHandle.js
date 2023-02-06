// 错误统一处理
const errorHandle = () => {
  console.log('errhandle');
  window.location.href = window.location.origin + '/error';
}

export default errorHandle;