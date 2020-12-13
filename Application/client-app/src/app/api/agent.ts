import axios, { AxiosResponse } from 'axios'
import { IDevice } from "../modules/device";

axios.defaults.baseURL = 'http://localhost:5000/api'

const responseBody = (response: AxiosResponse) => response.data

const requests = {
    get: (url:string) => axios.get(url).then(responseBody),
    post: (url:string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url:string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url:string) => axios.delete(url).then(responseBody)
}

const Devices = {
    list: ():Promise<IDevice[]> => requests.get('/devices'),
    details: (id: string) => requests.get(`/devices/${id}`),
    create: (devices: IDevice) => requests.post('/devices', devices),
    update: (devices: IDevice) => requests.put(`/devices/${devices.id}`, devices),
    delete: (id: string) => requests.del(`/devices/${id}`)
} 

// eslint-disable-next-line
export default { 
    Devices
} 


    