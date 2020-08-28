import express from 'express';
import verify from './verification.js';
import message from './message.js';

var router = express.Router();

router.get('/', verify);
router.post('/', message);

export default router;
