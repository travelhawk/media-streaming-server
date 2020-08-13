// NodeJS Media Server
// https://www.npmjs.com/package/node-media-server
//
// Use OBS or ffmpeg to publish the live stream
// ffmpeg example: ffmpeg -f dshow -framerate 30 -video_size 800x600 -rtbufsize 702000k -i video="MiraBox Video Capture" -vcodec libx264 -preset ultrafast -tune zerolatency -b:v 600k -f flv "rtmp://localhost/live/cocomo"
//
// Accessing the live stream
// RTMP - rtmp://localhost/live/STREAM_NAME
// http-flv - http://localhost:8000/live/STREAM_NAME.flv
// websocket-flv - ws://localhost:8000/live/STREAM_NAME.flv
// HLS - http://localhost:8000/live/STREAM_NAME/index.m3u8
// DASH - http://localhost:8000/live/STREAM_NAME/index.mpd
//
// Use https://www.hlstester.com/ as a streaming client for testing purpose.

const os = require('os')
const isWindows = os.platform() === "win32";

let ffmpeg_path = 'C:\\Program Files\\ffmpeg-4.0\\bin\\ffmpeg.exe';
if (!isWindows) {
    ffmpeg_path = '/usr/bin/ffmpeg'
}

const NodeMediaServer = require('node-media-server');

const config = {
    rtmp: {
        port: 2935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60
    },
    http: {
        port: 8008,
        mediaroot: './media',
        allow_origin: '*'
    },
    trans: {
        ffmpeg: ffmpeg_path,
        tasks: [
            {
                app: 'live',
                vc: "copy",
                vcParam: [],
                ac: "aac",
                acParam: ['-ab', '64k', '-ac', '1', '-ar', '44100'],
                rtmp:true,
                rtmpApp:'live-low',
                hls: true,
                hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
                dash: true,
                dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
            }
        ]
    }
};

var mediaserver = new NodeMediaServer(config);
mediaserver.run();

// only for cocomo
// RTMP - rtmp://localhost/live/cocomo
// http-flv - http://localhost:8000/live/cocomo.flv
// websocket-flv - ws://localhost:8000/live/cocomo.flv
// HLS - http://localhost:8000/live/cocomo/index.m3u8
// DASH - http://localhost:8000/live/cocomo/index.mpd