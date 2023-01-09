import axios from "axios";
import { TOKEN } from "../storage/config";
import localStorage from "../storage/localStorage";
import { BASE_URL, TIMEOUT } from './config';
import errorHandle from "./errorHandle";

const service = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers:{
    "Content-Type":"application/json;charset=utf-8"
  }
});

service.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN);
  config.headers.common['Authorization'] = 'Bearer ' + token;
  return config;
}, (error) => {
  errorHandle(error);
  return Promise.reject(error);
});

service.interceptors.response.use((response) => {
  // 处理数据格式
  if (response.status === 200) {
    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
}, (error) => {
  errorHandle(error);
  return Promise.reject(error);
});


export default service;