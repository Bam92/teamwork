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

import { type } from '../../../config';


import AuthwithDS from '../usingDS/controllers/auth';
import AuthwithDB from '../usingDB/controllers/auth';

const Auth = type === 'db' ? AuthwithDB : AuthwithDS;

const router = express.Router();

router.post('/signup', Auth.signup);
router.post('/signin', Auth.signin);

export default router;
