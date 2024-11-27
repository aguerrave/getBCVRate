import express from 'express';
import { getBcvRate } from '../controllers/bcvController.js';

const router = express.Router();

router.get('/bcv', getBcvRate);

export default router;
