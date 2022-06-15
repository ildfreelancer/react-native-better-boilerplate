import { forwardRef, Ref } from 'react'
import { BottomSheetModal, BottomSheetModalProps } from '@gorhom/bottom-sheet'
import { BottomBackdrop } from './components/bottom-backdrop'
import { BottomSheetHandle } from './components/bottom-sheet-handle'

export const BottomModal = forwardRef(
  ({ children, ...props }: BottomSheetModalProps, ref: Ref<BottomSheetModal>) => {
    return (
      <BottomSheetModal
        ref={ref}
        backdropComponent={BottomBackdrop}
        handleComponent={BottomSheetHandle}
        enablePanDownToClose
        keyboardBlurBehavior="restore"
        {...props}>
        {children}
      </BottomSheetModal>
    )
  },
)
