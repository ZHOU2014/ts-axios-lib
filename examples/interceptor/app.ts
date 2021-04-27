import axios from '../../src/axios'

axios.interceptors.request.use(function(config: AxiosRequestConfig) {
    config.headers.test += '1';
    return config;
});

axios.interceptors.request.use(function(config: AxiosRequestConfig) {
    config.headers.test += '2';
    return config;
});

axios.interceptors.request.use(function(config: AxiosRequestConfig) {
    config.headers.test += '3';
    return config;
});

axios.interceptors.response.use(function(config: AxiosResponse) {
    config.data += '4';
    return config;
});

const interceptorId = axios.interceptors.response.use(function(config: AxiosResponse) {
    config.data += '5';
    return config;
});

axios.interceptors.response.use(function(config: AxiosResponse) {
    config.data += '6';
    return config;
});

axios.interceptors.response.eject(interceptorId);

axios({
    method: 'get',
    url: '/interceptor/get',
    headers: {
        test: '',
    }
}).then((res) => {
    console.log(res.data);
});