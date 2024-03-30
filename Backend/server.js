import express from "express";
import userroute from "./routes/user.routes.js";
import connectToMongo from "./db/connectToMongoDB.js";
import dotenv from "dotenv";
import { createServer } from "http";
import pkg from "socket.io";
import RtmpServer from "node-media-server";
import { spawn } from "child_process";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
import http from "http";
const PORT = process.env.PORT || 3000;
import url from "url";
import bodyparser from "body-parser";
const {json,urlencoded} = bodyparser

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", userroute); 


const options = [
  "-i",
  "-",
  "-c:v",
  "libx264",
  "-preset",
  "ultrafast",
  "-tune",
  "zerolatency",
  "-r",
  `${25}`,
  "-g",
  `${25 * 2}`,
  "-keyint_min",
  25,
  "-crf",
  "25",
  "-pix_fmt",
  "yuv420p",
  "-sc_threshold",
  "0",
  "-profile:v",
  "main",
  "-level",
  "3.1",
  "-c:a",
  "aac",
  "-b:a",
  "128k",
  "-ar",
  32000,
  "-f",
  "flv",
  `rtmp://a.rtmp.youtube.com/live2/1324-2k1p-84wh-19r8-7g7j`,
];
const httpServer = createServer(app);
// const httpServer = http.createServer((req, res) => {
//   const parsedUrl = url.parse(req.url, true);
//     // Extract the path from the URL
//     const path = parsedUrl.pathname;

//     // Set up middleware functions
//     json()(req, res, () => {}); // Parse JSON request bodies
//     urlencoded({ extended: false })(req, res, () => {}); // Parse URL-encoded request bodies
//     cookieParser()(req, res, () => {}); // Parse cookies
//     cors()(req, res, () => {}); // Enable CORS

//     // Route requests based on the path
//     if (path.startsWith('/api')) {
//         // Route API requests to the user route module
//         userroute(req, res);
//     } else {
//         // Handle other routes (e.g., static files, etc.)
//         // Add your custom logic here
//         res.writeHead(404, { 'Content-Type': 'text/plain' });
//         res.end('404 Not Found');
//     }
// });
httpServer.listen(PORT, () => {
  connectToMongo();
  console.log("Listening on port ${PORT}");
});

const ffmpegProcess = spawn("ffmpeg", options);

ffmpegProcess.stdout.on("data", (data) => {
  console.log(`ffmpeg stdout: ${data}`);
});

ffmpegProcess.stderr.on("data", (data) => {
  console.error(`ffmpeg stderr: ${data}`);
});

ffmpegProcess.on("close", (code) => {
  console.log(`ffmpeg process exited with code ${code}`);
});

// Handle WebSocket connection
const io = pkg(httpServer, {
  cors: {
    origin: "http://localhost:5000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("New WebSocket connection");
  socket.on("binarystream", (stream) => {
    console.log("Binary Stream Incoming");
    ffmpegProcess.stdin.write(stream, (err) => {
      console.log("Err", err);
    });
  });
});
io.on("error", (err) => {
  console.log(err);
});
