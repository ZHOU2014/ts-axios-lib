import Cancel from './Cancel'

interface ResolvePromise {
  (reason: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(cancelExecutor: CancelExecutor) {
    let resolve: ResolvePromise
    this.promise = new Promise<Cancel>(res => {
      resolve = res
    })

    cancelExecutor((message: string) => {
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message)
      resolve(this.reason)
    })
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler

    const token: CancelToken = new CancelToken((cancel: Canceler) => {
      cancel = cancel
    })

    return {
      token,
      cancel
    }
  }
}
