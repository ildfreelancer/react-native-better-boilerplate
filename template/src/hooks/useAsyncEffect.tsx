import { useEffect } from 'react'

function useAsyncEffect(effect, destroy, inputs) {
  const hasDestroy = typeof destroy === 'function'

  useEffect(
    function () {
      let result
      let mounted = true
      const maybePromise = effect(function () {
        return mounted
      })

      Promise.resolve(maybePromise).then(function (value) {
        result = value
      })

      return function () {
        mounted = false

        if (hasDestroy) {
          destroy(result)
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    hasDestroy ? inputs : destroy,
  )
}

export default useAsyncEffect
