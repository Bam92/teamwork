/**
* @api {post} /api/v1/ Employee signup
* @api {post} /api/v1/ Sign in a user
* @apiPermission user
*
* @apiParam  {String} [email] Email
* @apiParam  {String} [first_name] First name
* @apiParam  {String} [last_name] Last name
* @apiParam  {String} [passwor] Password
*
* @apiSuccess (201) {Object} mixed `User` object
*/

import express from 'express';

import controller from '../controllers/auth';

const router = express.Router();

// / AUTH ROUTES ///

// POST Signup
router.post('/signup', controller.signup);

// POST Signin
router.post('/signin', controller.signin);

export default router;
