import express from 'express';
import { get, toggle, remove } from '../controllers/likes.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', get);
router.put('/', toggle);
router.delete('/', remove);

export default router;