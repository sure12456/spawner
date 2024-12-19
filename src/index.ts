import { Builder, Browser, By, Key, until, WebDriver } from 'selenium-webdriver'
import { Options } from 'selenium-webdriver/chrome'

async function openMeet(driver: WebDriver) {
  try {
    await driver.get('https://meet.google.com/yib-wpcv-mgk')

    await driver.wait(until.elementLocated(By.xpath('//span[contains(text(), "Got it")]')), 10000).click();
    await driver.wait(until.elementLocated(By.id('c11')), 10000).sendKeys("Testing1");
    await driver.wait(until.elementLocated(By.xpath('//span[contains(text(), "Ask to join")]')), 10000).click();

  } finally {
    // await driver.quit()
  }
}

async function getDriver() {
  const options = new Options()
  options.addArguments('--disable-blink-features=AutomationControlled')
  options.addArguments('--use-fake-ui-for-media-stream')
  // options.addArguments('--auto-select-desktop-capture-source=[RECORD]')
  // options.addArguments('--window-size=1080,720')
  // options.addArguments('--enable-usermedia-screen-capturing')


  let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build()
  return driver;
}

 async function startScreenshare(driver: WebDriver) {

  console.log("In startScreenshare");

  const response = await driver.executeScript(`

    function wait(delayInMS) {
      return new Promise((resolve) => setTimeout(resolve, delayInMS));
    }

    function startRecording(stream, lengthInMS) {
      let recorder = new MediaRecorder(stream);
      let data = [];

      recorder.ondataavailable = (event) => data.push(event.data);
      recorder.start();

      let stopped = new Promise((resolve, reject) => {
        recorder.onstop = resolve;
        recorder.onerror = (event) => reject(event.name);
      });


      let recorded = wait(lengthInMS).then(() => {
        if (recorder.state === 'recording') {
          recorder.stop();
        }
      });

    return Promise.all([stopped, recorded]).then(() => data);

  }

  console.log("Before Entering mediaDevice")

  window.navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: false,
    preferCurrentTab: true,
  }).then(async stream => {
    console.log("Stream Started now")
    const recordedChunks = await startRecording(stream, 30000);
    console.log("Recording started")

    let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
    const recording = document.createElement("video");
    recording.src = URL.createObjectURL(recordedBlob);

    const downloadButton = document.createElement("a");
    downloadButton.href = recording.src;
    downloadButton.download = "RecordedVideo.webm";
    downloadButton.click();
    console.log("Download button clicked")
  }) 
  `)
  // await driver.sleep(600000)
}



async function main() {
  const driver = await getDriver();
  await openMeet(driver);

  await startScreenshare(driver);
}


main();