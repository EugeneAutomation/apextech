import {test} from '@playwright/test';
import {APIHelper} from "../pageObjects/helpers/api.helper";

test.describe("API tests", () => {
    test('GET all products @api', async () => {
        const apiHelper = new APIHelper();
        await apiHelper.getAllProducts();
    });

    test('GET Highest and Lowest products prices @api', async () => {
        const apiHelper = new APIHelper();
        const allProducts = await apiHelper.getAllProducts();
        const calculatedProducts = await apiHelper.getHighestAndLowestProducts(allProducts);

        console.log('--- Highest Price Product ---');
        console.log(`Title: ${calculatedProducts.highestPriceProduct.title}, Price: ${calculatedProducts.highestPriceProduct.price}`);

        console.log('--- Lowest Price Product ---');
        console.log(`Title: ${calculatedProducts.lowestPriceProduct.title}, Price: ${calculatedProducts.lowestPriceProduct.price}`);
    });

    test('Check that all products contain required properties @api', async () => {
        const apiHelper = new APIHelper();
        const allProducts = await apiHelper.getAllProducts();
        await apiHelper.checkThatProductsContainRequiredProperties(allProducts);
    });
});
