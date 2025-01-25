import { env } from '@/core';
import axios, { AxiosError } from 'axios';

export const client = axios.create({
    baseURL: env.API_URL,
    withCredentials: true
});

// complate the interceptor to handle the response error
client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {
            const { status, data } = error.response;
            return Promise.reject({ status, data });
        }
        return Promise.reject(error);
    }
);