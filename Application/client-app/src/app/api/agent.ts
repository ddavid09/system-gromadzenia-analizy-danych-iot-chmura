import axios, { AxiosResponse } from 'axios'
import { IAppointment } from "../modules/appointment";

axios.defaults.baseURL = 'http://localhost:5000/api'

const responseBody = (response: AxiosResponse) => response.data

const requests = {
    get: (url:string) => axios.get(url).then(responseBody),
    post: (url:string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url:string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url:string) => axios.delete(url).then(responseBody)
}

const Appointments = {
    list: ():Promise<IAppointment[]> => requests.get('/appointments'),
    details: (id: string) => requests.get(`/appointments/${id}`),
    create: (appointment: IAppointment) => requests.post('/appointments', appointment),
    update: (appointment: IAppointment) => requests.put(`/appointments/${appointment.id}`, appointment),
    delete: (id: string) => requests.del(`/appointments/${id}`)
} 

// eslint-disable-next-line
export default { 
    Appointments 
} 


    