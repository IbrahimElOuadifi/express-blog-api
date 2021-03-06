import expess from 'express';
import { get, toggle, remove } from '../controllers/saves.js';
import auth from '../middleware/auth.js';

const router = expess.Router();

router.get('/', get);
router.put('/', toggle);
router.delete('/', remove);

export default router;