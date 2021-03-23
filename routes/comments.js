import express from 'express';
import { get, create, update, remove } from '../controllers/comments.js';

const router = express.Router();

router.get('/', get);
router.post('/', create);
router.put('/:id', update);
router.delete('/', remove);

export default router;
