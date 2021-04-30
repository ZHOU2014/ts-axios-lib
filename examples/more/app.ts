import axios from '../../src';

document.cookie = 'a=b';

axios.get('/more/get').then((res) => {
  console.log(res);
});

axios.post('http://localhost:8082/more/server2', {}, {
  withCredentials: true
}).then((res) => {
  console.log(res);
});