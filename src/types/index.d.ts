declare type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'head'
  | 'HEAD'
  | 'patch'
  | 'PATCH'

declare interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number

  transformRequest?: TransformFner | TransformFner[]

  transformResponse?: TransformFner | TransformFner[]

  cancelToken?: CancelToken

  [propName: string]: any
}

declare interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: XMLHttpRequest
}

declare interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

declare interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: XMLHttpRequest
  response?: AxiosResponse
}

declare interface Axios {
  defaults: AxiosRequestConfig
  interceptors: {
    request: InterceptorManagerImpl<AxiosRequestConfig>
    response: InterceptorManagerImpl<AxiosResponse>
  }
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

declare interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

declare interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance
  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}

declare interface InterceptorManagerImpl<T> {
  use(resolve: ResolveFn<T>, reject?: RejectFn): number
  eject(id: number): void
}

declare interface ResolveFn<T> {
  (val: T): T | Promise<T>
}

declare interface RejectFn {
  (error: any): any
}

declare interface TransformFner {
  (data: any, headers?: any): any
}

declare interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
  throwIfRequested: () => void
}

declare interface Canceler {
  (message: string): void
}

declare interface CancelExecutor {
  (canceler: Canceler): void
}

declare interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

declare interface CancelTokenStatic {
  new (cancelExecutor: CancelExecutor): CancelToken

  source: () => CancelTokenSource
}

declare interface Cancel {
  message?: string
}

declare interface CancelStatic {
  new (message?: string): Cancel
}
