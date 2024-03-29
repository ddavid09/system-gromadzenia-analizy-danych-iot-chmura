import { InteractionRequiredAuthError } from "@azure/msal-browser";
import axios, { AxiosResponse } from "axios";
import { msalInstance } from "../auth/authConfig";
import { IDevice } from "../modules/device";
import { ITableValuesEnvelope } from "../modules/TableValue";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  async (config) => {
    const currentAccount = msalInstance.getAllAccounts()[0];
    const silentRequest = {
      scopes: ["https://sgdsddawidziak.onmicrosoft.com/api/application.access"],
      account: currentAccount,
      forceRefresh: false,
    };

    const request = {
      scopes: ["https://sgdsddawidziak.onmicrosoft.com/api/application.access"],
      loginHint: currentAccount.username,
    };

    const tokenResponse = await msalInstance.acquireTokenSilent(silentRequest).catch((error) => {
      if (error instanceof InteractionRequiredAuthError) {
        return msalInstance.acquireTokenPopup(request);
      }
    });

    if (tokenResponse) {
      const { accessToken } = tokenResponse;
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
  download: (url: string) =>
    axios
      .request({
        url: url,
        method: "GET",
        responseType: "blob",
      })
      .then(responseBody),
};

const Devices = {
  getAll: (): Promise<IDevice[]> => requests.get("/devices"),
  details: (id: string) => requests.get(`/devices/${id}`),
  create: (device: IDevice) => requests.post("/devices", device),
  update: (device: IDevice) => requests.put(`/devices/${device.deviceId}`, device),
  delete: (id: string) => requests.del(`/devices/${id}`),
  download: (id: string) => requests.download(`devices/${id}/download`),
};

const TableValues = {
  get: (deviceId: string, params: URLSearchParams): Promise<ITableValuesEnvelope> =>
    axios.get(`/devices/${deviceId}/values`, { params: params }).then(responseBody),
};

const agent = {
  Devices,
  TableValues,
};

export default agent;
