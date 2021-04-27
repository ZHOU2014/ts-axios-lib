import axios from '../../src';
import qs from 'qs';

axios.defaults.headers.common['test1'] = 123

// axios({
//     url: '/config/post',
//     method: 'post',
//     data: {a: '1'},
//     headers: {
//         test: '321'
//     },
//     transformRequest: [
//         function (data: any) {
//             return qs.stringify(data);
//         },
//         ...(axios.defaults.transformRequest as TransformFner[])
//     ],
//     transformResponse: [
//         ...(axios.defaults.transformResponse as TransformFner[]),
//         function (data: any) {
//             if (typeof data === 'object') {
//                 data.b = 3;
//             }

//             return data;
//         }
//     ]
// }).then((res: any) => {
//     console.log(res.data);
// });

const instance = axios.create({
    transformRequest: [
        function (data: any) {
            return qs.stringify(data);
        },
        ...(axios.defaults.transformRequest as TransformFner[])
    ],
    transformResponse: [
        ...(axios.defaults.transformResponse as TransformFner[]),
        function (data: any) {
            if (typeof data === 'object') {
                data.b = 3;
            }

            return data;
        }
    ]
});

instance({
    url: '/config/post',
    method: 'post',
    data: {a: '1'},
    headers: {
        test: '321'
    },
}).then((res: any) => {
    console.log(res.data);
});

instance({
    url: '/config/post',
    method: 'post',
    data: {a: '3'},
    headers: {
        test: '123'
    },
}).then((res: any) => {
    console.log(res.data);
});

