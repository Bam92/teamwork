import express from 'express';
import verifyToken from '../middlewares/verifyToken';


const router = express.Router();

router.post('/comments/:id/flag', verifyToken);

export default router;
