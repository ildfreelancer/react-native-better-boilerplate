import { forwardRef, Ref, useCallback, useMemo } from 'react'
import {
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
  BottomSheetBackdrop,
  BottomSheetModalProps,
} from '@gorhom/bottom-sheet'

import { Optional } from '@utils/typescript-helpers'
import { BottomSheetHandle } from '@components/bottom-modal/components/bottom-sheet-handle'

type BottomDynamicHeightModalProps = Optional<BottomSheetModalProps, 'snapPoints'>
export const BottomDynamicHeightModal = forwardRef(
  ({ children }: BottomDynamicHeightModalProps, ref: Ref<BottomSheetModal>) => {
    const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], [])
    const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
      useBottomSheetDynamicSnapPoints(initialSnapPoints)

    const _renderBackdrop = useCallback(props => {
      return (
        <BottomSheetBackdrop
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          enableTouchThrough
          {...props}
        />
      )
    }, [])
    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        enablePanDownToClose
        enableOverDrag
        activeOffsetY={[0, 0]}
        handleComponent={BottomSheetHandle}
        backdropComponent={_renderBackdrop}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore">
        <BottomSheetView onLayout={handleContentLayout}>{children}</BottomSheetView>
      </BottomSheetModal>
    )
  },
)
