import { flatternHeaders } from '../helpers/headers'
import { buildURL } from '../helpers/url'
import { transform } from './transform'
import xhr from './xhr'

export default function dispatchRequest(axiosConfig: AxiosRequestConfig): AxiosPromise {
  processConfig(axiosConfig)
  return xhr(axiosConfig).then((res: AxiosResponse) => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flatternHeaders(config.headers, config.method!)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config

  return buildURL(url!, params)
}

function transformResponseData(res: AxiosResponse) {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

function throwIfRequested(config: AxiosRequestConfig) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
