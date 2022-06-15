import { Api } from '@services/api'
import { useState, useCallback } from 'react'

export const useUploadFile = (options: { url: string }) => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState(null)

  const uploadForm = useCallback(
    async (formData: FormData) => {
      try {
        setIsLoading(true)
        setIsError(false)
        const data = await Api.instance
          .getPrivateGateway()
          .put<null, string>(options?.url, formData, {
            onUploadProgress: progressEvent => {
              const pg = (progressEvent.loaded / progressEvent.total) * 100
              setProgress(pg)
            },
            onDownloadProgress: progressEvent => {
              const pg = (progressEvent.loaded / progressEvent.total) * 100
              setProgress(pg)
            },
          })
        setIsSuccess(true)
        return data
      } catch (err: any) {
        setIsError(true)
        setError(err)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [options?.url],
  )

  return { uploadForm, isLoading, isSuccess, progress, error, isError }
}
