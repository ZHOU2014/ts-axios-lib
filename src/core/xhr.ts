import { createError } from '../helpers/error'
import { parseHeaders } from '../helpers/url'

export default function xhr(axiosConfig: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials
    } = axiosConfig

    const request: XMLHttpRequest = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) request.timeout = timeout
    if (withCredentials) request.withCredentials = withCredentials

    request.open(method, url!, true)

    request.onreadystatechange = function() {
      if (request.readyState !== 4) return

      if (request.status === 0) return

      const responseHeader: any = parseHeaders(request.getAllResponseHeaders())
      const responseData: any =
        request.responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeader,
        config: axiosConfig,
        request
      }

      handleResponse(response)
    }

    request.onerror = function() {
      reject(createError('Network Error', axiosConfig, null, request))
    }

    request.ontimeout = function() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, axiosConfig, 'ECONNABORTED', request))
    }

    Object.keys(headers).forEach((name: string) => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    if (cancelToken) {
      cancelToken.promise.then((res: Cancel) => {
        request.abort()
        reject(res)
      })
    }

    request.send(data)

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed width status code ${response.status}`,
            axiosConfig,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
