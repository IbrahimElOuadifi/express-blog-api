import express from 'express';
import { get, create, update, remove } from '../controllers/comments.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', get);
router.post('/', create);
router.put('/:id', update);
router.delete('/', remove);

export default router;
