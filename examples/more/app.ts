import qs from 'qs';
import axios from '../../src';

// document.cookie = 'a=b';

// axios.get('/more/get').then((res) => {
//   console.log(res);
// });

// axios.post('http://localhost:8082/more/server2', {}, {
//   withCredentials: true
// }).then((res) => {
//   console.log(res);
// });


// const instance = axios.create({
//   xsrfCookieName: 'XSRF-TOKEN-D',
//   xsrfHeaderName: 'X-XSRF-TOKEN-D',
// });

// instance.get('/more/get').then((res) => {
//   console.log(res);
// });

// axios.post('/more/post', {
//   a: 1
// }, {
//   auth: {
//     username: 'Yee1',
//     password: '123456'
//   }
// }).then((res) => {
//   console.log(res);
// });

// axios.get('/more/304').then((res) => {
//   console.log(res);
// }).catch((e) => {
//   console.log(e.message);
// });

// axios.get('/more/304', {
//   validateStatus(status: number) {
//     return status >= 200 && status < 400;
//   }
// }).then((res) => {
//   console.log(res);
// }).catch((e) => {
//   console.log(e.message);
// });

// axios.get('/more/get', {
//   params: new URLSearchParams('a=b&c=d')
// }).then((res) => {
//   console.log(res);
// });

// axios.get('/more/get', {
//   params: {
//     a: 1,
//     b: 2,
//     c: ['a', 'b', 'c']
//   }
// }).then((res) => {
//   console.log(res);
// });

// const instance = axios.create({
//   paramsSerializer(params) {
//     return qs.stringify(params, {
//       arrayFormat: 'brackets'
//     });
//   }
// });

// instance.get('/more/get', {
//   params: {
//     a: 1,
//     b: 2,
//     c: ['a', 'b', 'c']
//   }
// }).then((res) => {
//   console.log(res);
// });


// const instance = axios.create({
//   baseURL: 'https://img.mukewang.com/'
// });

// instance.get('5cc01a7b0001a33718720632.jpg');

// instance.get('https://img.mukewang.com/szimg/5becd5ad0001b89306000338-360-202.jpg');

function getA() {
  return axios.get('/more/A');
}

function getB() {
  return axios.get('/more/B');
}

axios.all([getA(), getB()]).then(axios.spead((resA, resB) => {
  console.log(resA.data);
  console.log(resB.data);
}));

axios.all([getA(), getB()]).then(([resA, resB]) => {
  console.log(resA.data);
  console.log(resB.data);
});

const fakeConfig = {
  baseURL: 'https://www.baidu.com',
  url: '/user/12345',
  params: {
    idClient: 1,
    idTest: 2,
    testString: 'testString'
  }
}

console.log(axios.getUri(fakeConfig));

console.log(new axios.Axios(fakeConfig));