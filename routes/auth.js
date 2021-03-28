import express from 'express';
import { get, remove, signin, signup, google } from '../controllers/auth.js';

const router = express.Router();

router.get('/user/:id', get);
router.delete('/user/:id', remove);
router.post('/signin', signin);
router.post('/signup', signup);
router.post('/google', google);

export default router;
