// import express from 'express';
import express from 'express';
// import userroute from './routes/user.routes.js';
import userroute from './routes/user.routes.js';
import connectToMongo from './db/connectToMongoDB.js';
import dotenv from 'dotenv';
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use("/api", userroute);

app.listen(PORT, () => {
    connectToMongo();
    console.log("Listening on port 5000");
});
