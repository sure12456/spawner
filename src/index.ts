import { Builder, Browser, By, Key, until } from 'selenium-webdriver'

async function main() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build()
  try {
    await driver.get('https://meet.google.com/yrm-pvbi-ohk?hs=193&hs=187&ijlm=1734417497293&adhoc=1')
    // await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN)
    await driver.wait(until.titleIs('webdriver - Google Search'), 10000)
  } finally {
    await driver.quit()
  }
}

main();