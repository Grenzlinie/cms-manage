import axios from 'axios'

// 配置项接口
interface AxiosOption {
    baseURL: string;
    timeout: number;
}

// 配置项
const axiosOption: AxiosOption = {
    baseURL: 'http://106.15.43.155:9000/manage',
    timeout: 5000
}

// 创建一个axios实例
const instance = axios.create(axiosOption);

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  let token = localStorage.getItem("cms-token");
  if (token) {
    config.headers = {
      "cms-token": token
    }
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default instance;
