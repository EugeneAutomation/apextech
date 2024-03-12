import {test} from '@playwright/test';
import {APIHelper} from "../pageObjects/helpers/api.helper";

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

test.describe("API tests", () => {
    test('GET all products @api', async () => {
        const apiHelper = new APIHelper();
        await apiHelper.getAllProducts();
    });

    test('GET Highest and Lowest products prices @api', async () => {
        const apiHelper = new APIHelper();
        let allProducts = await apiHelper.getAllProducts();
        let highestPriceProduct: Product = allProducts.products[0];
        let lowestPriceProduct: Product = allProducts.products[0];

        allProducts.products.forEach((product: Product) => {
            if (product.price > highestPriceProduct.price) {
                highestPriceProduct = product;
            }
            if (product.price < lowestPriceProduct.price) {
                lowestPriceProduct = product;
            }
        });

        console.log('--- Highest Price Product ---');
        console.log(`Title: ${highestPriceProduct.title}, Price: ${highestPriceProduct.price}`);

        console.log('--- Lowest Price Product ---');
        console.log(`Title: ${lowestPriceProduct.title}, Price: ${lowestPriceProduct.price}`);
    });

    test('Check that all products contain required properties @api', async () => {
        const apiHelper = new APIHelper();
        let allProducts = await apiHelper.getAllProducts();

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
        const allProductsContainRequiredProperties = allProducts.products.every(hasRequiredProperties);
        if (allProductsContainRequiredProperties) {
            console.log('All products contain required properties.');
        } else {
            console.log('Not all products contain required properties.');
        }
    });
});
