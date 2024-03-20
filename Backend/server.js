// import express from 'express';
import express from 'express';
// import userroute from './routes/user.routes.js';
import userroute from './routes/user.routes.js';
import connectToMongo from './db/connectToMongoDB.js';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mediasoup from 'mediasoup';
import RtmpServer from 'node-media-server';
import dotenv from 'dotenv';
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use("/api", userroute);

// app.listen(PORT, () => {
//     connectToMongo();
//     console.log("Listening on port 5000");
// });

const httpServer = createServer(app);
httpServer.listen(PORT,()=>{
    // connectToMongo();
    console.log('Listening on port ${PORT}');
})
// Create a mediasoup worker
const mediaServer = await mediasoup.createWorker();

// Initialize the mediasoup worker
await mediaServer.initialize();

// Create a router
const router = await mediaServer.createRouter({
  mediaCodecs: [
    {
      kind: 'audio',
      mimeType: 'audio/opus',
      clockRate: 48000,
      channels: 2,
    },
    {
      kind: 'video',
      mimeType: 'video/VP8',
      clockRate: 90000,
      parameters: {
        'x-google-start-bitrate': 1000,
      },
    },
  ],
});

// Handle WebSocket connection
const io = new Server(httpServer);

io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  // Create a transport for each client
  socket.on('createTransport', async () => {
    const transport = await router.createWebRtcTransport({
      listenIps: [{ ip: '127.0.0.1', announcedIp: '127.0.0.1' }],
      enableUdp: true,
      enableTcp: true,
      preferUdp: true,
    });
    socket.emit('transportCreated', {
      id: transport.id,
      iceParameters: transport.iceParameters,
      iceCandidates: transport.iceCandidates,
      dtlsParameters: transport.dtlsParameters,
    });
  });

  // Connect transport for each client
  socket.on('connectTransport', async ({ transportId, dtlsParameters }) => {
    const transport = await router.getTransport(transportId);
    await transport.connect({ dtlsParameters });
  });

  // Create producer for each client
  socket.on('createProducer', async ({ transportId, kind, rtpParameters }) => {
    const transport = await router.getTransport(transportId);
    const producer = await transport.produce({ kind, rtpParameters });
    socket.emit('producerCreated', {
      id: producer.id,
    });
  });

  // Create consumer for each client
  socket.on('createConsumer', async ({ producerId, consumerTransportId }) => {
    const producer = await router.getProducer({ producerId });
    const consumerTransport = await router.getTransport(consumerTransportId);
    const consumer = await consumerTransport.consume({
      producerId,
      rtpCapabilities: consumerTransport.rtpCapabilities,
      paused: false,
    });
    socket.emit('consumerCreated', {
      id: consumer.id,
      producerId,
      kind: consumer.kind,
      rtpParameters: consumer.rtpParameters,
    });
  });

  // Handle client disconnection
  socket.on('disconnect', async () => {
    console.log('WebSocket disconnected');
  });
});



// Create a new RTMP server instance
const rtmpServer = new RtmpServer();

// Start the RTMP server on port 1935
rtmpServer.run({
  port: 1935,
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 60,
    ping_timeout: 30,
  },
});

// Handle incoming RTMP streams
rtmpServer.on('connect', (client, info) => {
  console.log(`RTMP client connected: ${info.app} - ${info.stream}`);
  
  // Forward the incoming stream to YouTube Live
  // Replace 'rtmp://youtube-live-server.com/live/streamKey' with your actual YouTube Live RTMP URL and stream key
  const ffmpegCommand = `ffmpeg -i rtmp://localhost:1935/${info.app}/${info.stream} -c:v copy -c:a aac -strict experimental -f flv rtmp://youtube-live-server.com/live/streamKey`;

  // Execute the ffmpeg command
  const ffmpegProcess = require('child_process').exec(ffmpegCommand);

  // Log ffmpeg output
  ffmpegProcess.stdout.on('data', (data) => {
    console.log(`ffmpeg stdout: ${data}`);
  });

  // Log ffmpeg errors
  ffmpegProcess.stderr.on('data', (data) => {
    console.error(`ffmpeg stderr: ${data}`);
  });

  // Handle ffmpeg process exit
  ffmpegProcess.on('exit', (code) => {
    console.log(`ffmpeg process exited with code ${code}`);
  });

  // Handle client disconnect
  client.on('close', () => {
    console.log(`RTMP client disconnected: ${info.app} - ${info.stream}`);
    
    // Kill the ffmpeg process when the client disconnects
    ffmpegProcess.kill();
  });
});
