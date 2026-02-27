import type { RandStrFn } from '@/types'

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()_=-+|'./<>:;[]{}"

const useRandomString =
  (length: number, urlEncode?: boolean, from?: string): RandStrFn =>
  () => {
    const f = from ?? characters
    const randomValues = new Uint32Array(length)
    const result = new Array<string>(length)

    window.crypto.getRandomValues(randomValues)
    randomValues.forEach((value) => {
      result.push(f.charAt(value % f.length))
    })
    if (urlEncode ?? true) {
      return encodeURI(result.join(''))
    }
    return result.join('')
  }

export default useRandomString
