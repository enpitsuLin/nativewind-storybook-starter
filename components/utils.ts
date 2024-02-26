import type { MutableRefObject, Ref } from 'react'

export function combineRefs<T>(...refs: (Ref<T> | undefined)[]) {
  return (node: T) => refs.forEach((ref) => {
    if (typeof ref === 'function')
      ref(node)
    else if (ref !== null && ref !== undefined)
      (ref as MutableRefObject<T>).current = node
  },
  )
}

export function pick<T extends object, K extends keyof T>(obj: T, predicate: (k: string) => boolean): Pick<T, K> {
  const properties = Object.keys(obj).filter(predicate)
  const filteredObj: Pick<T, K> = {} as Pick<T, K>
  for (const property of properties)
    filteredObj[property as K] = obj[property as keyof T] as unknown as T[K]

  return filteredObj
}

// filters an object based on an array of keys
export function pickImpl<T extends object, K extends keyof T>(obj: T, keys: Array<K>): Pick<T, K> {
  return pick(
    obj,
    k => keys.includes(k as K),
  )
}

export function omitImpl<T extends object, K extends keyof T>(obj: T, keys: Array<K>): Pick<T, K> {
  return pick(
    obj,
    k => !keys.includes(k as K),
  )
}
