import { AxiosService } from '~/plugins/axios'

export const useAxios = () => {
    const axiosService = new AxiosService()
    return axiosService
  }
  
  export default defineNuxtPlugin(() => {
    const axiosService = new AxiosService()
    
    return {
      provide: {
        axios: axiosService
      }
    }
  })