import express from 'express';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.get('/articles/categories/:id', verifyToken);

export default router;
