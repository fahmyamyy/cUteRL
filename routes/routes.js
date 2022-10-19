import express from 'express';
import { getUrl, Insert, Home, Result, Redirect, NotFound } from '../controllers/urlControllers.js';

const router = express.Router();

// URL API
router.post('/url', Insert);
router.get('/url/:short', getUrl);

//
router.get('/', Home);
router.get('/:url', Redirect);
router.get('/result/:short', Result);

export default router;