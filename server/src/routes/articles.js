/***
* @apiParam  {String} [email] Email
* @apiParam  {String} [firstaName] First name
* @apiParam  {String} [lastName] Last name
* @apiParam  {String} [password] Password
* @apiParam  {String} [gender] Password
*
* @apiSuccess (201) {Object} mixed `Employee` object
*/

import express from 'express';

import verifyToken from '../middlewares/verifyToken';
import controller from '../controllers/articles';

const router = express.Router();

router.get('/feeds', verifyToken, controller.getArticles);
router.post('/articles', verifyToken, controller.createArticle);
router.patch('/articles/:id', verifyToken, controller.updateArticle);

export default router;