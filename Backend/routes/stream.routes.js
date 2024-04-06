import {addStream} from '../controller/stream.controller.js';
import express from 'express';
const router = express.Router();

router.post('/stream',addStream);

export default router;