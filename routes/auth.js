import express from 'express';
import { get, remove, signin, signup, google, getPassword, setPassword } from '../controllers/auth.js';

const router = express.Router();

router.get('/user/:id', get);
router.delete('/user/:id', remove);
router.post('/signin', signin);
router.post('/signup', signup);
router.post('/google', google);
router.get('/pass/:id', getPassword);
router.post('/pass/:id', setPassword);


export default router;