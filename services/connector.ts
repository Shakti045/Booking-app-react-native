import axios, { AxiosRequestConfig } from 'axios';

export const axiosInstance = axios.create({});


export const apiConnector = ({method, url,data, headers, params}:AxiosRequestConfig) => {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: data ? data : null,
        headers: headers ? headers: null,
        params: params ? params : null,
    });
}