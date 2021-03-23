import express from 'express';
import { get, create, update, remove } from '../controllers/posts.js';

const router = express.Router();

router.get('/', get);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;