import {test} from "@playwright/test";
import {allure} from "allure-playwright";
import {ContentType} from "allure-js-commons";

export function step(message: string) {
    return function actualDecorator(originalMethod: Function) {
        return function replacementMethod(this: any, ...args: any) {
            return test.step(message, async () => {
                    if (args.length) {
                        args.forEach((arg) => {
                            allure.attachment('STEP ARGUMENT:', JSON.stringify(arg, null, 4), ContentType.JSON);
                        });
                    }
                    return await originalMethod.call(this, ...args);
                },
                {box: true})
        }
    }
}