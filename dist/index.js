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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let driver = yield new selenium_webdriver_1.Builder().forBrowser(selenium_webdriver_1.Browser.CHROME).build();
        try {
            yield driver.get('https://meet.google.com/yrm-pvbi-ohk?hs=193&hs=187&ijlm=1734417497293&adhoc=1');
            // await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN)
            yield driver.wait(selenium_webdriver_1.until.titleIs('webdriver - Google Search'), 10000);
        }
        finally {
            yield driver.quit();
        }
    });
}
main();
