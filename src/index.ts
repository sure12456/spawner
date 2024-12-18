import { Builder, Browser, By, Key, until } from 'selenium-webdriver'
import { Options } from 'selenium-webdriver/chrome'

async function main() {

  const options = new Options()
  options.addArguments('--disable-blink-features=AutomationControlled')
  options.addArguments('--use-fake-ui-for-media-stream')


  let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build()
  try {
    await driver.get('https://meet.google.com/yrm-pvbi-ohk?hs=193&hs=187&ijlm=1734417497293&adhoc=1')

    console.log("Site opened")
    await driver.sleep(6000)

    console.log("Passed here.")
    const text = await driver.findElement(By.id('c11')).sendKeys("Testing", Key.ENTER)

    await driver.sleep(6000)
    // if (text) {
    //   console.log("This is text : ", text)
    // }
    

  } finally {
    await driver.quit()
  }
}

main();