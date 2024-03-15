import {signup,login,logout} from '../controller/users.controller.js';
// const {signup} = require('../controller/users.controller');
import express from 'express';
const router = express.Router();

router.post('/logout',logout);
router.post('/signup',signup);
router.post('/login',login);
export default router;