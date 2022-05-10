import { VideoCapture } from 'camera-capture'

const asciiDensity = "=====++++++++********#########%%%%%%%%@@@@@@@@@@@@"

const cameraRecorder = new VideoCapture({
    width: 150,
    height: 55
})

function findIndex(pixelBrightness) {
  return Math.floor(pixelBrightness / 255 * asciiDensity.length)
}

cameraRecorder.addFrameListener(frame => {  
  var frameAsciiText = ""

  for (var i = 0 ; i < frame.data.length ; i += 4) {
    if (i / 4 % (frame.width) == 0)
      frameAsciiText += "\n"

    var r = frame.data[i]
    var g = frame.data[i+1]
    var b = frame.data[i+2]

    var pixelBrightness = (r + g + b) / 3

    var asciiCharacter = asciiDensity[findIndex(pixelBrightness)]
    frameAsciiText += asciiCharacter 
  }

  console.log(frameAsciiText)
})

await cameraRecorder.start()