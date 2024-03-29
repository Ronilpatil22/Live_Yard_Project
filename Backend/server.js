// import express from 'express';
import express from 'express';
// import userroute from './routes/user.routes.js';
import userroute from './routes/user.routes.js';
import connectToMongo from './db/connectToMongoDB.js';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import RtmpServer from 'node-media-server';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", userroute);

app.listen(PORT, () => {
    connectToMongo();
    console.log(`Listening on port ${PORT}`);
});
const options = [
  '-i',
  '-',
  '-c:v', 'libx264',
  '-preset', 'ultrafast',
  '-tune', 'zerolatency',
  '-r', `${25}`,
  '-g', `${25 * 2}`,
  '-keyint_min', 25,
  '-crf', '25',
  '-pix_fmt', 'yuv420p',
  '-sc_threshold', '0',
  '-profile:v', 'main',
  '-level', '3.1',
  '-c:a', 'aac',
  '-b:a', '128k',
  '-ar', 128000 / 4,
  '-f', 'flv',
  `rtmp://a.rtmp.youtube.com/live2/stream-key`,
];
const httpServer = createServer(app);
httpServer.listen(6000,()=>{
    console.log('Listening on port ${PORT}');
})
const ffmpegProcess = spawn('ffmpeg', options);

ffmpegProcess.stdout.on('data', (data) => {
    console.log(`ffmpeg stdout: ${data}`);
});

ffmpegProcess.stderr.on('data', (data) => {
    console.error(`ffmpeg stderr: ${data}`);
});

ffmpegProcess.on('close', (code) => {
    console.log(`ffmpeg process exited with code ${code}`);
});

// Handle WebSocket connection
const io = new Server(httpServer);

io.on('connection', (socket) => {
  console.log('New WebSocket connection');
  socket.on('binarystream',stream=>{
    console.log('Binary Stream Incoming')
    ffmpegProcess.stdin.write(stream, (err) => {
      console.log('Err', err)
  })
  })
});




