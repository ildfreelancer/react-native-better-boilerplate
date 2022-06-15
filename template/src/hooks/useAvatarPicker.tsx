import { ActionSheet, ActionSheetOptions } from '@components/action-sheet'
import { useCallback } from 'react'
import {
  Asset,
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker'
import { useTranslation } from 'react-i18next'
import { toast } from '@utils/toast'
import { IMAGE_MAX_WIDTH, IMAGE_MAX_HEIGHT } from '@constants/index'

type UseAvatarPickerProps = {
  hasAvatar?: boolean
  onAvatarChange?: (file?: Asset) => void
  imagePickerOptions?: {
    image?: ImageLibraryOptions
    camera?: CameraOptions
  }
}
const useAvatarPicker = ({
  hasAvatar,
  onAvatarChange,
  imagePickerOptions,
}: UseAvatarPickerProps) => {
  const { t } = useTranslation()

  const _onImageOptionPress = useCallback(
    async (index: number) => {
      try {
        let result: ImagePickerResponse | undefined
        switch (index) {
          case 0: {
            result = await launchImageLibrary({
              mediaType: 'photo',
              selectionLimit: 1,
              quality: 0.9,
              maxWidth: IMAGE_MAX_WIDTH,
              maxHeight: IMAGE_MAX_HEIGHT,
              ...imagePickerOptions?.image,
            })

            break
          }
          case 1: {
            result = await launchCamera({
              mediaType: 'photo',
              saveToPhotos: true,
              quality: 0.9,
              maxWidth: IMAGE_MAX_WIDTH,
              maxHeight: IMAGE_MAX_HEIGHT,
              ...imagePickerOptions?.camera,
            })
            break
          }
          case 2: {
            onAvatarChange?.(undefined)
            break
          }
          default:
            break
        }

        if (result) {
          const file = result.assets?.[0]
          onAvatarChange?.(file)
        }
      } catch (err: any) {
        toast.show({
          type: 'error',
          message: err.message,
          messageTx: 'generic_error',
        })
      }
    },
    [imagePickerOptions?.camera, imagePickerOptions?.image, onAvatarChange],
  )

  const onPress = useCallback(() => {
    const options = hasAvatar
      ? [t('choose_from_gallery'), t('open_camera'), t('delete_the_picture'), t('cancel')]
      : [t('choose_from_gallery'), t('open_camera'), t('cancel')]
    const cancelButtonIndex = options.length - 1

    const actionSheetOptions: ActionSheetOptions = {
      title: t('picture'),
      options,
      cancelButtonIndex,
      onPress: _onImageOptionPress,
    }

    if (hasAvatar) {
      const destructiveButtonIndex = options.length - 2
      actionSheetOptions.destructiveButtonIndex = destructiveButtonIndex
    }
    ActionSheet.show(actionSheetOptions)
  }, [_onImageOptionPress, hasAvatar, t])

  return { onPress }
}

export default useAvatarPicker
