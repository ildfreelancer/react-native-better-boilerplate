import { ScaledSheet } from '@lib/react-native-size-matters'
import { Overlay as RNEOverlay, OverlayProps as RNOverlayProps } from '@rneui/themed'
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react'
import { MaterialIndicator } from '@components/indicator/material-indicator'

export type LoadingProps = Partial<RNOverlayProps>
export type LoadingRef = {
  show: () => void
  hide: () => void
}
type LoadingRefObj = {
  current: LoadingRef | null
}

let refs: LoadingRefObj[] = []

/**
 * Adds a ref to the end of the array, which will be used to show the toasts until its ref becomes null.
 *
 * @param newRef the new ref, which must be stable for the life of the Toast instance.
 */
function addNewRef(newRef: LoadingRef) {
  refs.push({
    current: newRef,
  })
}

/**
 * Removes the passed in ref from the file-level refs array using a strict equality check.
 *
 * @param oldRef the exact ref object to remove from the refs array.
 */
function removeOldRef(oldRef: LoadingRef | null) {
  refs = refs.filter(r => r.current !== oldRef)
}

const useLoading = options => {
  const [isVisible, setIsVisible] = useState(!!options?.isVisible)

  const hide = useCallback(() => {
    setIsVisible(false)
  }, [])

  const show = useCallback(() => {
    setIsVisible(true)
  }, [])

  return {
    isVisible,
    show,
    hide,
  }
}
const LoadingRoot = forwardRef((props: LoadingProps, ref) => {
  const { show, hide, isVisible } = useLoading(props)

  // This must use useCallback to ensure the ref doesn't get set to null and then a new ref every render.
  useImperativeHandle(
    ref,
    useCallback(
      () => ({
        show,
        hide,
      }),
      [hide, show],
    ),
  )

  return (
    <RNEOverlay overlayStyle={styles.overlay} isVisible={isVisible}>
      <MaterialIndicator />
    </RNEOverlay>
  )
})

export const Loading = (props: LoadingProps) => {
  const loadingRef = useRef<LoadingRef | null>(null)

  /*
    This must use `useCallback` to ensure the ref doesn't get set to null and then a new ref every render.
    Failure to do so will cause whichever Toast *renders or re-renders* last to be the instance that is used,
    rather than being the Toast that was *mounted* last.
  */
  const setRef = useCallback((ref: LoadingRef | null) => {
    // Since we know there's a ref, we'll update `refs` to use it.
    if (ref) {
      // store the ref in this toast instance to be able to remove it from the array later when the ref becomes null.
      loadingRef.current = ref
      addNewRef(ref)
    } else {
      // remove the this toast's ref, wherever it is in the array.
      removeOldRef(loadingRef.current)
    }
  }, [])

  return <LoadingRoot ref={setRef} {...props} />
}

/**
 * Get the active Overlay instance `ref`, by priority.
 * The "highest" Overlay in the `View` hierarchy has the highest priority.
 *
 * For example, a Overlay inside a `Modal`, would have had its ref set later than a Toast inside App's Root.
 * Therefore, the library knows that it is currently visible on top of the App's Root
 * and will thus use the `Modal`'s Overlay when showing/hiding.
 *
 * ```js
 * <>
 *  <Loading />
 *  <Modal>
 *    <Loading />
 *  </Modal>
 * </>
 * ```
 */
function getRef() {
  const reversePriority = [...refs].reverse()
  const activeRef = reversePriority.find(ref => ref?.current !== null)
  if (!activeRef) {
    return null
  }
  return activeRef.current
}

Loading.show = () => {
  getRef()?.show()
}

Loading.hide = () => {
  getRef()?.hide()
}

const styles = ScaledSheet.create({
  overlay: {
    backgroundColor: 'transparent',
  },
})
