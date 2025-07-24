export interface ApiResponse<T> {
  data: T | null
  isLoading: boolean
  error: string | null
  success: boolean
}

export async function useApiFetch<T>(path: string, options: any = {}): Promise<ApiResponse<T>> {
  const config = useRuntimeConfig()
  
  const response: ApiResponse<T> = {
    data: null,
    isLoading: true,
    error: null,
    success: false
  }

  try {
    const data = await $fetch<T>(path, {
      baseURL: config.public.apiBaseUrl,
      ...options,
    })

    response.data = data
    response.success = true
    response.isLoading = false
  } catch (error: any) {
    console.error('API Fetch Error:', error)
    response.error = error.message || 'Неизвестная ошибка'
    response.isLoading = false
    response.success = false
  }

  return response
}