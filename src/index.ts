import { Builder, Browser, By, Key, until, WebDriver } from 'selenium-webdriver'
import { Options } from 'selenium-webdriver/chrome'

async function openMeet(driver: WebDriver) {
  try {
    await driver.get('https://meet.google.com/rgv-jfxg-zqn')

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
    video: {
      displaySurface: "browser"
    },
    audio: false,
    preferCurrentTab: true,
  }).then(async stream => {

    // console.log("audio logic start");
    // const audioContext = new AudioContext();
    // const screenAudioStream = audioContext.createMediaStreamSource(stream)
    // const audiosrc1 = document.querySelectorAll("audio")[0];
    // const audiosrc2 = document.querySelectorAll("audio"")[1];
    // const audiosrc3 = document.querySelectorAll("audio")[2];

    // const audioStream1 = audioContext.createMediaStreamSource(audiosrc1.srcObject);
    // const audioStream2 = audioContext.createMediaStreamSource(audiosrc2.srcObject);
    // const audioStream3 = audioContext.createMediaStreamSource(audiosrc3.srcObject);
    
    // const dest = audioContext.createMediaStreamDestination();

    // screenAudioStream.connect(dest);
    // audioStream1.connect(dest);
    // audioStream2.connect(dest);
    // audioStream3.connect(dest);


    console.log("Stream Started now")
    const recordedChunks = await startRecording(stream, 10000);
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