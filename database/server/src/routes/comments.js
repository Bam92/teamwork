import express from 'express';
import verifyToken from '../middlewares/verifyToken';
import Comment from '../controllers/comments';

const router = express.Router();

// router.post('/comments/:id/flag', verifyToken, Comment.flagComment);

export default router;
