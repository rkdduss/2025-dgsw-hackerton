import axios, { AxiosInstance, AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';

import { router } from 'expo-router';

export interface ApiConfig {
    url: string
    timeout: number
}

const DEFAULT_API_CONFIG: ApiConfig = {
    url: String(process.env.EXPO_PUBLIC_API_URL),
    timeout: 30000,
}

export const tokenStorage = {
    setTokens: async (token:string) => {
        await SecureStore.setItemAsync("token", token);
    },
    clearTokens: async () => {
        await SecureStore.deleteItemAsync("token");
    },
    getToken: async () => {  
        return await SecureStore.getItemAsync("token");
    },
}

export class Api {
    axiosInstance: AxiosInstance
    config: ApiConfig

    constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
        this.config = config
        this.axiosInstance = axios.create({
            baseURL: this.config.url,
            timeout: this.config.timeout,
            headers: {
                Accept: 'application/json',
            },
        })

        this.axiosInstance.interceptors.request.use(async (request) => {
            const token = await tokenStorage.getToken()
            if (token && request.headers) {
                request.headers.Authorization = `Bearer ${token}`
            }
            return request
        })

        this.axiosInstance.interceptors.response.use(
            (response:AxiosResponse) => response,
            async (error) => {
                if (error.response?.status === 401) {
                    await tokenStorage.clearTokens()
                    router.replace("/(auth)")
                    return
                }
                return Promise.reject(error)
            },
        )
    }
}

const api = new Api();
export { api };