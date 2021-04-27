import Cancel, { isCancel } from './cancel/Cancel'
import CancelToken from './cancel/CancelToken'
import Axios from './core/Axios'
import mergeConfig from './core/mergeConfig'
import defaults from './default'
import { extend } from './helpers/util'

function createInstance(initDefaults: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(initDefaults)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function(config?: AxiosRequestConfig): AxiosInstance {
  return createInstance(mergeConfig(defaults, config))
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

export default axios
