import {signup,login} from '../controller/users.controller.js';
// const {signup} = require('../controller/users.controller');
import express from 'express';
const router = express.Router();


router.post('/signup',signup);
router.post('/login',login);
export default router;