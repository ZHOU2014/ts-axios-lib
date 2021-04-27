export function transform(data: any, headers: any, fns?: TransformFner | TransformFner[]) {
  if (!fns) return data

  if (!Array.isArray(fns)) fns = [fns]

  fns.forEach((fn: TransformFner) => {
    data = fn(data, headers)
  })

  return data
}
