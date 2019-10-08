/**
* @api {post} /api/v1/ Employee signup
* @api {post} /api/v1/ Sign in an employee
* @apiPermission user
*
* @apiParam  {String} [email] Email
* @apiParam  {String} [first-name] First name
* @apiParam  {String} [last-ame] Last name
* @apiParam  {String} [password] Password
* @apiParam  {String} [gender] gender
*
* @apiSuccess (201) {Object} mixed `Employee` object
*/

import express from 'express';

import Auth from '../controllers/auth';

const router = express.Router();

router.post('/signup', Auth.signup);
router.post('/signin', Auth.signin);

export default router;
