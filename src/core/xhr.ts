import cookie from '../helpers/cookie'
import { createError } from '../helpers/error'
import { isURLSameOrigin, parseHeaders } from '../helpers/url'
import { isFormData } from '../helpers/util'

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
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onUploadProgress,
      onDownloadProgress,
      auth,
      validateStatus
    } = axiosConfig

    const request: XMLHttpRequest = new XMLHttpRequest()

    request.open(method, url!, true)

    configureRequest()

    addEvents()

    processHeaders()

    processCancel()

    request.send(data)

    function configureRequest(): void {
      if (responseType) {
        request.responseType = responseType
      }

      if (timeout) request.timeout = timeout
      if (withCredentials) request.withCredentials = withCredentials
    }

    function addEvents(): void {
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
        reject(
          createError(`Timeout of ${timeout} ms exceeded`, axiosConfig, 'ECONNABORTED', request)
        )
      }

      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }

      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    function processHeaders(): void {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)

        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue
        }
      }

      if (auth) {
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
      }

      Object.keys(headers).forEach((name: string) => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise.then((res: Cancel) => {
          request.abort()
          reject(res)
        })
      }
    }

    function handleResponse(response: AxiosResponse): void {
      if (!validateStatus || validateStatus(response.status)) {
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
