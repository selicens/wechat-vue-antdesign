import axios from 'axios'
import { message } from 'ant-design-vue'

const service = axios.create({
    baseURL: 'http://cm.voiper.cn/boot/faceid',
    timeout: 10000,
})
service.interceptors.request.use(
    (config: any) => {
        console.log("config--", config)
        return config
    },
    (error: any) => {
        message.error(error)
        return Promise.reject(error)
    }
)
service.interceptors.response.use(
    (response: any) => {
        console.log("response--", response)
        return response.data ? response.data : response
    },
    (error: any) => {
        return Promise.reject(error)
    }
)

export default service
