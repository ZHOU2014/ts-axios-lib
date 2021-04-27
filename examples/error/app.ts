import axios from '../../src/index';

// // tslint:disable-next-line: no-floating-promises
// axios({
//   method: 'get',
//   url: '/error/get1',
//   data: {
//       a: 1,
//       b: 2,
//   }
// }).then((res: AxiosResponse) => {
//   console.log(res);
// }).catch((e) => {
//   console.log(e);
// });

// // tslint:disable-next-line: no-floating-promises
// axios({
//   method: 'get',
//   url: '/error/get',
//   data: {
//       a: 1,
//       b: 2,
//   }
// }).then((res: AxiosResponse) => {
//   console.log(res);
// }).catch((e) => {
//   console.log(e);
// });

// setTimeout(() => {
//   // tslint:disable-next-line: no-floating-promises
//   axios({
//     method: 'get',
//     url: '/error/get',
//     data: {
//         a: 1,
//         b: 2,
//     }
//   }).then((res: AxiosResponse) => {
//     console.log(res);
//   }).catch((e) => {
//     console.log(e);
//   });
// }, 5000);

// tslint:disable-next-line: no-floating-promises
axios({
  method: 'get',
  url: '/error/get',
  data: {
      a: 1,
      b: 2,
  },
}).then((res: AxiosResponse) => {
  console.log(res);
}).catch((e: AxiosError) => {
  console.log(e);
  console.log(e.code);
  console.log(e.config);
  console.log(e.message);
  console.log(e.request);
  console.log(e.response);
});
