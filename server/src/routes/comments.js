import express from 'express';
import verifyToken from '../middlewares/verifyToken';
import controller from '../controllers/comments';

const router = express.Router();

router.post('/comments/:id/flag', verifyToken, controller.flagComment);

export default router;
