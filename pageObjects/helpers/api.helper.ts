import axios, { AxiosInstance, AxiosResponse } from "axios";
import { expect } from "@playwright/test";
import {step} from "./allure.helper";

export class APIHelper {
    private apiClient: AxiosInstance;

    constructor() {
        this.apiClient = axios.create({
            baseURL: 'https://dummyjson.com',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.apiClient.interceptors.response.use(
            (res: AxiosResponse) => {
                return res;
            },
            (err: any) => {
                console.log(this.errorResponse(err));
                return Promise.reject(err);
            }
        );
    }

    private errorResponse(response: any) {
        return {
            status: response?.status,
            statusText: response?.statusText,
            url: response?.config.url,
            method: response?.config.method,
            data: response?.config?.data,
            errors: response?.data?.errors,
            message: response?.data,
        };
    }
    @step('GET All Products')
    async getAllProducts() {
        const {status, data} = await this.apiClient.get('/products');
        expect(status, 'GET /products completed').toEqual(200);
        return data;
    }
}