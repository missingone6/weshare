import axios from "axios";
import { TOKEN } from "../storage/config";
import localStorage from "../storage/localStorage";
import { BASE_URL, TIMEOUT, PUBLIC_PATH_ARRAY, PRIVATE_PATH_ARRAY } from './config';
import errorHandle from "./errorHandle";
import qs from 'qs'
const pendingRequest = new Map();

function generateReqKey(config) {
  const { method, url, params, data } = config;
  return [method, url, qs.stringify(params), qs.stringify(data)].join(
    "&"
  );
}

function addPendingRequest(config) {
  const requestKey = generateReqKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingRequest.has(requestKey)) {
        pendingRequest.set(requestKey, cancel);
      }
    });
}

function removePendingRequest(config) {
  const requestKey = generateReqKey(config);
  if (pendingRequest.has(requestKey)) {
    const cancel = pendingRequest.get(requestKey);
    cancel(requestKey);
    pendingRequest.delete(requestKey);
  }
}

const service = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
});

service.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN);
  if (token
    && (
      !PUBLIC_PATH_ARRAY.some(item => item.test(config.url))
      || PRIVATE_PATH_ARRAY.some(item => item.test(config.url)
      )
    )
  ) {
    config.headers.common['Authorization'] = 'Bearer ' + token;
  }
  removePendingRequest(config); // 检查是否存在重复请求，若存在则取消已发的请求
  addPendingRequest(config); // 把当前请求添加到pendingRequest对象中
  return config;
}, (error) => {
  errorHandle(error);
  return Promise.reject(error);
});

service.interceptors.response.use((response) => {
  removePendingRequest(response.config); // 从pendingRequest对象中移除请求
  // 处理数据格式
  if (response.status === 200) {
    // 获取更新的token
    const { authorization } = response.headers;
    if (!authorization) {
      // 防止用户登录时token过期
      const { token } = response.data;
      token && localStorage.setItem(TOKEN, token);
      console.log(token)
    }
    //如果token存在则存在localStorage
    authorization && localStorage.setItem(TOKEN, authorization);
    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
}, (error) => {
  removePendingRequest(error.config || {}); // 从pendingRequest对象中移除请求
  if (axios.isCancel(error)) {
    console.log("已取消的重复请求：" + error.message);
  } else {
    // 添加异常处理
    errorHandle(error);
  }
  return Promise.reject(error);
});

export default service;