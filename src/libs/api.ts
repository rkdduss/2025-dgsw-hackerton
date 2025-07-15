import axios, { AxiosInstance } from 'axios'
import * as SecureStore from 'expo-secure-store';

import { useRouter } from 'expo-router';


export interface ApiConfig {
	url: string
	timeout: number
}

export const DEFAULT_API_CONFIG: ApiConfig = {
	url: 'http://34.64.159.224:8080/',
	timeout: 10000,
}


export const tokenStorage = {
	setTokens: async (data:String) => {
		await SecureStore.setItemAsync("user", JSON.stringify(data));
	},
	clearTokens: async () => {
		await SecureStore.deleteItemAsync("user");
	},
	getAccessToken: async () => {  
		const userStr = await SecureStore.getItemAsync("user");
		return userStr ? JSON.parse(userStr)["accessToken"] : null
    },
	getRefreshToken: async () => {
        const userStr = await SecureStore.getItemAsync("user");
		return userStr ? JSON.parse(userStr)["refreshToken"] : null
    },
}

// API 클래스
export class Api {
	axiosInstance: AxiosInstance
	config: ApiConfig
	isRefreshing: boolean = false
	failedQueue: any[] = []

	constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
		const router = useRouter()
		this.config = config
		this.axiosInstance = axios.create({
			baseURL: this.config.url,
			timeout: this.config.timeout,
			headers: {
				Accept: 'application/json',
			},
		})

		this.axiosInstance.interceptors.request.use(async (request) => {
			const token = await tokenStorage.getAccessToken()
			if (token && request.headers) {
				request.headers.Authorization = `Bearer ${token}`
			}
			return request
		})

		// 인터셉터후 401이면 토큰 재발급
		this.axiosInstance.interceptors.response.use(
			(response) => response,
			async (error) => {
				const originalRequest = error.config
				if (originalRequest.url == "/users/me" && error.response.status == 403) {
					router.push("/(auth)")
					await tokenStorage.clearTokens()
					return 
				}
					
				if (
					error.response?.status == 403 && await tokenStorage.getRefreshToken() == null
				) {
					if (this.isRefreshing) {
						return new Promise((resolve, reject) => {
							this.failedQueue.push({ resolve, reject })
						})
							.then(() => this.axiosInstance(originalRequest))
							.catch((err) => Promise.reject(err))
					}

					originalRequest._retry = true
					this.isRefreshing = true

					try {
						const refreshResponse = await this.axiosInstance.post('/auth/refresh', {
							refresh: await tokenStorage.getRefreshToken()
						})

						const newAccess = refreshResponse.data.data.accessToken

						await tokenStorage.setTokens(refreshResponse.data.data)

						// 큐에 있는 요청 재시도
						this.failedQueue.forEach((prom) => prom.resolve())
						this.failedQueue = []

						originalRequest.headers.Authorization = `Bearer ${newAccess}`
						return this.axiosInstance(originalRequest)
					} catch (refreshError) {
						this.failedQueue.forEach((prom) => prom.reject(refreshError))
						this.failedQueue = []
						await tokenStorage.clearTokens()
						return Promise.reject(refreshError)
					} finally {
						this.isRefreshing = false
					}
				}

				return Promise.reject(error)
			},
		)
	}
}

// 싱글턴 인스턴스
export const api = new Api()