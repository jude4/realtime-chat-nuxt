import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { useRuntimeConfig, navigateTo, useCookie } from '#app'

// Create a singleton instance
let instance: AxiosService | null = null

export class AxiosService {
  private axios: AxiosInstance

  constructor(config?: AxiosRequestConfig) {
    this.axios = axios.create({
      baseURL: useRuntimeConfig().public.baseUrl || 'http://localhost:8000',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      ...config,
    })

    // Request Interceptor
    this.axios.interceptors.request.use(
      (config) => {
        const token = useCookie('token').value
  
        if (token && config.headers) {
          config.headers.Authorization = `${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response Interceptor
    this.axios.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (error) => {
        if (error.response?.status === 401) {
          navigateTo('/login')
        }
        return Promise.reject(error)
      }
    )
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axios.get<T>(url, config)
    return response.data
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axios.post<T>(url, data, config)
    return response.data
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axios.put<T>(url, data, config)
    return response.data
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axios.delete<T>(url, config)
    return response.data
  }
}

// Singleton getter
export const useAxiosService = () => {
  if (!instance) {
    instance = new AxiosService()
  }
  return instance
}

// Nuxt Plugin
export default defineNuxtPlugin(() => {
  const axiosService = useAxiosService()
  
  return {
    provide: {
      axios: axiosService
    }
  }
})

// Type declarations for Nuxt
declare module '#app' {
  interface NuxtApp {
    $axios: AxiosService
  }
}

// Runtime config type
declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    public: {
      baseUrl: string
    }
  }
}