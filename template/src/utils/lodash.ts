import reduce from 'lodash-es/reduce'
import extend from 'lodash-es/extend'
import pickBy from 'lodash-es/pickBy'
import isObject from 'lodash-es/isObject'
import transform from 'lodash-es/transform'
import isEqual from 'lodash-es/isEqual'
import identity from 'lodash-es/identity'

export {
  isNil,
  flatten,
  reduce,
  toInteger,
  debounce,
  unescape,
  pick,
  isEmpty,
  orderBy,
  omit,
  merge,
  find,
  filter,
  chain,
  sortBy,
  clone,
  unionBy,
  findLast,
  shuffle,
  slice,
  map,
} from 'lodash-es'
export const mergeAll = (...args) => reduce(args, extend)

export const omitNil = obj => pickBy(obj, identity)

/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
export function difference(object, base) {
  function changes(o, b) {
    return transform(o, function (result, value, key) {
      if (!isEqual(value, b[key])) {
        result[key] = isObject(value) && isObject(b[key]) ? changes(value, b[key]) : value
      }
    })
  }
  return changes(object, base)
}
