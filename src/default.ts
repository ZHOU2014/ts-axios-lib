import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'
import { transformData } from './helpers/url'

const defaults: AxiosRequestConfig = {
  method: 'get',

  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },

  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function(data: any): any {
      return transformData(data)
    }
  ]
}

const methodsNoData: string[] = ['get', 'delete', 'head', 'options']

methodsNoData.forEach((method: string) => {
  defaults.headers[method] = {}
})

const methodsWithData: string[] = ['post', 'put', 'patch']

methodsWithData.forEach((method: string) => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
