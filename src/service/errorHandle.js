// 错误统一处理
const errorHandle = (error) => {
  if (error.response.status === 401) { // 身份过期/token无效
    //  跳转到登录页面登录
    setTimeout(() => {
      window.location.href = window.location.origin + '/login';
    }, 200)
  }
}

export default errorHandle;