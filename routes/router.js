import express from 'express';
import verify from './verification.js';

var router = express.Router();

router.get('/', verify);

export default router;
