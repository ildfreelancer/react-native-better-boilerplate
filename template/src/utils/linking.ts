import { Linking, Platform } from 'react-native'

export const openStoreWriteReviews = async ({
  itunesItemId,
  androidPackageName,
}: {
  itunesItemId?: string
  androidPackageName?: string
}) => {
  if (Platform.OS === 'ios') {
    // Open the iOS App Store in the browser -> redirects to App Store on iOS
    // Linking.openURL(`https://apps.apple.com/app/apple-store/id${itunesItemId}?action=write-review`)
    // Open the iOS App Store directly
    return Linking.openURL(
      `itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${itunesItemId}?action=write-review`,
    )
  } else {
    // Linking.openURL(
    //   `https://play.google.com/store/apps/details?id=${androidPackageName}&showAllReviews=true`,
    // )
    // Open the Android Play Store directly
    return Linking.openURL(
      `market://details?id=${androidPackageName}&showAllReviews=true`,
    )
  }
}
