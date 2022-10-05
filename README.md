# media-streaming-server
Live RTMP Media Server which remux to HTTP, WS, HLS and DASH.

This is based on [node-media-server](https://www.npmjs.com/package/node-media-server) for nodejs.

You can stream any live stream to this rmtp server and access the live stream in your web application using HTTP, WS, HLS or DASH.

## Installation
1. Install ffmpeg
2. Install dependencies with ```npm install```
3. Run application with ```node src/NodeMediaServer```

## Usage

### OBS
To stream from OBS, you need to setup the following settings for streaming.
![image](https://user-images.githubusercontent.com/7582909/194090867-199587b9-c9d6-4ba3-9913-d3446eeb264b.png)

### ffmpeg
This is an example to stream from a "MiraBox Video Capture" device to the RMTP server. With this setup it is possible to broadcast a Miracast live stream from any miracast-enabled device (e.g. HoloLens 2) to the internet.
However, depending on the video size there might be a delay.
```
ffmpeg -f dshow -framerate 30 -video_size 800x600 -rtbufsize 702000k -i video="MiraBox Video Capture" -vcodec libx264 -preset ultrafast -tune zerolatency -b:v 600k -f flv "rtmp://localhost/live/STREAM_NAME"
```
