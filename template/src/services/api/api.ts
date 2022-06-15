import Axios, { AxiosInstance } from 'axios'
import Config from 'react-native-config'
// import { ENDPOINTS } from '@services/api/endpoints'

const { API_BASE_URL } = Config
export class Api {
  private static _instance: Api
  private axiosInstancePrivate: AxiosInstance
  private axiosInstancePublic: AxiosInstance

  constructor() {
    this.axiosInstancePrivate = Axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    this.axiosInstancePublic = Axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
  }

  async setup() {
    this.axiosInstancePublic.interceptors.response.use(
      response => {
        const data = response.data
        return data
      },
      error => {
        return Promise.reject(error.response.data)
      },
    )
    this.axiosInstancePrivate.interceptors.response.use(response => {
      const data = response.data
      return data
    })
  }

  static get instance() {
    if (!Api._instance) {
      Api._instance = new Api()
      Api._instance.setup()
    }

    return Api._instance
  }

  getPrivateGateway() {
    return this.axiosInstancePrivate
  }

  setAuth(userToken: string) {
    this.axiosInstancePrivate.defaults.headers.Authorization = `Bearer ${userToken}`
  }

  clearAuth() {
    this.axiosInstancePrivate.defaults.headers.Authorization = undefined
  }

  // API PUBLIC
}
