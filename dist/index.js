"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
const chrome_1 = require("selenium-webdriver/chrome");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const options = new chrome_1.Options();
        options.addArguments('--disable-blink-features=AutomationControlled');
        options.addArguments('--use-fake-ui-for-media-stream');
        let driver = yield new selenium_webdriver_1.Builder().forBrowser(selenium_webdriver_1.Browser.CHROME).setChromeOptions(options).build();
        try {
            yield driver.get('https://meet.google.com/yrm-pvbi-ohk?hs=193&hs=187&ijlm=1734417497293&adhoc=1');
            // await driver.sleep(6000)
            // await driver.findElement(By.id('c11')).sendKeys("Testing")
            yield driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.xpath('//span[contains(text(), "Got it")]')), 10000).click();
            yield driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.id('c11')), 10000).sendKeys("Testing1");
            yield driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.xpath('//input[@id="c11"]')), 10000).sendKeys("Testing2");
            yield driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.xpath('//input[@placeholder="Your name"]')), 10000).sendKeys("Testing3");
            yield driver.sleep(600000);
            //*[@id="c11"]
        }
        finally {
            yield driver.quit();
        }
    });
}
main();
