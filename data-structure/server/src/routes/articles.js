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
import Article from '../usingDS/controllers/articles';

const router = express.Router();

router.get('/feeds', verifyToken, Article.getArticles);
router.post('/articles', verifyToken, Article.createArticle);
router.patch('/articles/:id', verifyToken,Article.updateArticle);
router.delete('/articles/:id', verifyToken, Article.deleteArticle);
router.post('/articles/:id/comments', verifyToken, Article.addComment);
router.get('/articles/:id', verifyToken, Article.getArticle);
router.post('/articles/:id/flag', verifyToken, Article.flagArticle);

export default router;
