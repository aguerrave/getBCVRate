import express from 'express';
import bcvRoutes from './bcv.js';

const router = express.Router();

router.use('/rates', bcvRoutes);

export default router;
