import axios, { AxiosInstance, AxiosResponse } from "axios";
import { expect } from "@playwright/test";
import {step} from "./allure.helper";

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

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

    @step('GET Highest and Lowest Price Products')
    async getHighestAndLowestProducts(products: any) {

        let highestPriceProduct: Product = products.products[0];
        let lowestPriceProduct: Product = products.products[0];
        products.products.forEach((product: Product) => {
            if (product.price > highestPriceProduct.price) {
                highestPriceProduct = product;
            }
            if (product.price < lowestPriceProduct.price) {
                lowestPriceProduct = product;
            }
        });
        return {
            highestPriceProduct: highestPriceProduct,
            lowestPriceProduct: lowestPriceProduct
        }
    }

    @step('Check that all products contain required properties')
    async checkThatProductsContainRequiredProperties(products) {

        // Function to check if a product has all required properties
        function hasRequiredProperties(product: any): product is Product {
            return (
              typeof product.id === 'number' &&
              typeof product.title === 'string' &&
              typeof product.description === 'string' &&
              typeof product.price === 'number' &&
              typeof product.discountPercentage === 'number' &&
              typeof product.rating === 'number' &&
              typeof product.stock === 'number' &&
              typeof product.brand === 'string' &&
              typeof product.category === 'string' &&
              typeof product.thumbnail === 'string' &&
              Array.isArray(product.images) &&
              product.images.every((image: any) => typeof image === 'string')
            );
        }

        // Check all products
        const allProductsContainRequiredProperties = products.products.every(hasRequiredProperties);
        if (allProductsContainRequiredProperties) {
            console.log('All products contain required properties.');
        } else {
            console.log('Not all products contain required properties.');
        }
    }
}