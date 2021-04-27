import axios from '../../src/index';

// // tslint:disable-next-line: no-floating-promises
// axios({
//   url: '/extend/get',
//   method: 'get',
// }).then((res: AxiosResponse) => {
//   console.log(res);
// });

// tslint:disable-next-line: no-floating-promises
// axios.request({
//   url: '/extend/get',
//   method: 'get',
//   params: {
//     a: 1,
//     b: 2,
//   },
// }).then((res: AxiosResponse) => {
//   console.log(res);
// });

// // tslint:disable-next-line: no-floating-promises
// axios.get('/extend/get').then((res: AxiosResponse) => {
//   console.log(res);
// });

// // tslint:disable-next-line: no-floating-promises
// axios.delete('/extend/delete').then((res: AxiosResponse) => {
//   console.log(res);
// });
// // tslint:disable-next-line: no-floating-promises
// axios.head('/extend/head').then((res: AxiosResponse) => {
//   console.log(res);
// });
// // tslint:disable-next-line: no-floating-promises
// axios.options('/extend/options').then((res: AxiosResponse) => {
//   console.log(res);
// });

// // tslint:disable-next-line: no-floating-promises
// axios.post('/extend/post', {a: 1, b: 2}).then((res: AxiosResponse) => {
//   console.log(res);
// });

// // tslint:disable-next-line: no-floating-promises
// axios.put('/extend/put', {a: 3, b: 4}).then((res: AxiosResponse) => {
//   console.log(res);
// });

// // tslint:disable-next-line: no-floating-promises
// axios.patch('/extend/patch', {a: 5, b: 6}).then((res: AxiosResponse) => {
//   console.log(res);
// });

// tslint:disable-next-line: no-floating-promises
// axios({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hi'
//   }
// }).then((res: AxiosResponse) => {
//   console.log(res);
// });
// axios('/extend/post', {
//   method: 'post',
//   data: {
//     msg: 'hello'
//   },
// }).then((res: AxiosResponse) => {
//   console.log(res);
// });

interface ResponseData<T> {
  code: number;
  data: T;
  message: string;
}

interface User {
  name: string;
  age: number;
}

function getUser<T = any>() {
  return axios<ResponseData<T>>('/extend/user').then(res => res.data).catch(err => console.log(err));
};

async function test() {
  const user = await getUser<User>();

  if (user) {
    console.log(user.data.name);
  }
}

test();
