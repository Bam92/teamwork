/**
* @api {post} /api/v1/ Employee signup
* @api {post} /api/v1/ Sign in an employee
* @apiPermission user
*
* @apiParam  {String} [email] Email
* @apiParam  {String} [firstaName] First name
* @apiParam  {String} [lastName] Last name
* @apiParam  {String} [passwor] Password
* @apiParam  {String} [gender] Password
*
* @apiSuccess (201) {Object} mixed `Employee` object
*/

import express from 'express';

import Auth from '../usingDS/controllers/auth';

const router = express.Router();

router.post('/signup', Auth.signup);
router.post('/signin', Auth.signin);

export default router;
