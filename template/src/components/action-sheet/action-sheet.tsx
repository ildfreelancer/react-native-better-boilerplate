import ActionSheetCustom, { ActionSheetProps } from '@alessiocancian/react-native-actionsheet'
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'

export type ActionSheetOptions = ActionSheetProps
export type ActionSheetRef = {
  show: (options: ActionSheetOptions) => void
}
type ActionSheetRefObj = {
  current: ActionSheetRef | null
}
let refs: ActionSheetRefObj[] = []

function addNewRef(newRef: ActionSheetRef) {
  refs.push({
    current: newRef,
  })
}

function removeOldRef(oldRef: ActionSheetRef | null) {
  refs = refs.filter(r => r.current !== oldRef)
}

const useActionSheet = actionOptions => {
  const [actionSheetProps, setActionSheetProps] = useState<ActionSheetProps>({
    ...actionOptions,
    options: actionOptions.options || [],
  })

  const showOptions = useCallback(async (props: ActionSheetOptions) => {
    setActionSheetProps(props)
  }, [])

  return {
    showOptions,
    actionSheetProps,
  }
}
const ActionSheetRoot = forwardRef((props: ActionSheetProps, ref: any) => {
  const { showOptions, actionSheetProps } = useActionSheet(props)
  const innerRef = useRef<ActionSheetCustom>(null)

  useImperativeHandle(
    ref,
    useCallback(
      () => ({
        show(opt) {
          showOptions(opt).then(() => {
            innerRef.current?.show()
          })
        },
      }),
      [showOptions],
    ),
  )

  return <ActionSheetCustom ref={innerRef} styles={actionSheetStyles} {...actionSheetProps} />
})

export const ActionSheet = (
  props = {
    options: [],
    onPress: () => undefined,
  } as Partial<ActionSheetProps>,
) => {
  const currentRef = useRef<ActionSheetRef | null>(null)
  const setRef = useCallback((ref: ActionSheetRef | null) => {
    if (ref) {
      currentRef.current = ref
      addNewRef(ref)
    } else {
      removeOldRef(currentRef.current)
    }
  }, [])

  return <ActionSheetRoot ref={setRef} {...(props as ActionSheetProps)} />
}

function getRef() {
  const reversePriority = [...refs].reverse()
  const activeRef = reversePriority.find(ref => ref?.current !== null)
  if (!activeRef) {
    return null
  }
  return activeRef.current
}

ActionSheet.show = options => {
  getRef()?.show(options)
}

const actionSheetStyles = StyleSheet.create({
  titleText: {
    fontSize: 13,
  },
  messageText: {
    fontSize: 15,
  },
})
