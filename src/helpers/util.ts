const toString = Object.prototype.toString

export function isDate(val: Date): val is Date {
  return toString.call(val) === '[object Date]'
}

// export function isObject(val: Object): val is Object {
//   return val !== null && typeof val === 'object'
// }

export function isPlainObject(val: Object): val is Object {
  return toString.call(val) === '[object Object]'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }

  return to as T & U
}

export function deepMerge(...args: any[]): any {
  const result = Object.create(null)
  args.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach((key: string) => {
        const val = obj[key]

        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
