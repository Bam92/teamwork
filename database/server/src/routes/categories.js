import express from 'express';
import verifyToken from '../middlewares/verifyToken';
import Category from '../controllers/categories';

const router = express.Router();

// router.get('/articles/categories/:id', verifyToken, Category.getArticlesByTag);

export default router;
