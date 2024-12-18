import { Builder, Browser, By, Key, until } from 'selenium-webdriver'
import { Options } from 'selenium-webdriver/chrome'

async function main() {

  const options = new Options()
  options.addArguments('--disable-blink-features=AutomationControlled')
  options.addArguments('--use-fake-ui-for-media-stream')


  let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build()
  try {
    await driver.get('https://meet.google.com/yrm-pvbi-ohk?hs=193&hs=187&ijlm=1734417497293&adhoc=1')

    // await driver.sleep(6000)
    // await driver.findElement(By.id('c11')).sendKeys("Testing")

    await driver.wait(until.elementLocated(By.xpath('//span[contains(text(), "Got it")]')), 10000).click();
    await driver.wait(until.elementLocated(By.id('c11')), 10000).sendKeys("Testing1");
    await driver.wait(until.elementLocated(By.xpath('//input[@id="c11"]')), 10000).sendKeys("Testing2");
    await driver.wait(until.elementLocated(By.xpath('//input[@placeholder="Your name"]')), 10000).sendKeys("Testing3");

    await driver.sleep(600000)

    //*[@id="c11"]
  } finally {
    await driver.quit()
  }
}

main();