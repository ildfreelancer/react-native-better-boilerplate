declare module 'react-native-config' {
  interface Env {
    // app
    SIZE_MATTERS_BASE_WIDTH: string
    SIZE_MATTERS_BASE_HEIGHT: string
    API_BASE_URL: string
  }

  const BuildConfig: Env

  export default BuildConfig
}
