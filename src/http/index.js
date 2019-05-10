import axios from 'axios'
import apiUrl from './api'

process.env.NODE_ENV === 'development' ? require('../mock') : '';

// 使用由库提供的配置的默认值来创建实例
const instance = axios.create();

instance.defaults.baseURL = apiUrl.baseURL; // 配置axios请求的地址
instance.defaults.timeout = 2500; // 请求超时时间
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
instance.defaults.crossDomain = true;
instance.defaults.withCredentials = true; // 设置cross跨域 并设置访问权限 允许跨域携带cookie信息
instance.defaults.headers.common.Authorization = ''; // 设置请求头为 Authorization

// 请求拦截器
instance.interceptors.request.use(config => config, error => Promise.reject(error));

// 响应拦截器
instance.interceptors.response.use(response => response, error => Promise.reject(error));

export default instance;
