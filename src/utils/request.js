import axios from "axios";

const instance = axios.create({
    baseURL:"http://cm.voiper.cn/boot/faceid",
    timeout:5000,
})

instance.interceptors.request.use(
    config=>{
        console.log('config拦截')
        return config
    },
    error=>{
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    response=>{
        console.log('res拦截')
        console.log(response);
        return response.data ? response.data : response
    },
    error=>{
        return Promise.reject(error)
    }
)
export default instance