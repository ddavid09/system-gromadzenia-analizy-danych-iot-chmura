import axios, { AxiosResponse } from 'axios'
import { IDevice } from "../modules/device";

axios.defaults.baseURL = 'http://localhost:5000/api'

const responseBody = (response: AxiosResponse) => response.data

const sleep = (ms: number) => (response: AxiosResponse) => 
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
    get: (url:string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url:string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url:string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    del: (url:string) => axios.delete(url).then(sleep(1000)).then(responseBody)
}

const Devices = {
    getAll: ():Promise<IDevice[]> => requests.get('/devices'),
    details: (id: string) => requests.get(`/devices/${id}`),
    create: (device: IDevice) => requests.post('/devices', device),
    update: (device: IDevice) => requests.put(`/devices/${device.deviceId}`, device),
    delete: (id: string) => requests.del(`/devices/${id}`)
} 


export default {
    Devices
}


    