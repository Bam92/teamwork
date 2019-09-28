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
import { celebrate, Joi } from 'celebrate'

import controller from '../controllers/auth';
import { emailRegex } from '../../../config'

const router = express.Router();

router.post('/signup', celebrate({
  body: Joi.object().keys({
    firstName: Joi.string().min(5).required().error(new Error('firstName must not be empty or less than 5 char')/*errors => {
      errors.forEach(err => {
        switch (err.type) {
          case 'any.empty':
            err.message = 'Value should not be empty!'
            break;
          case 'string.min':
            err.message = `Value should have at least ${err.context.limit} characters!`;
            break;
          default:
            break;
        }
      })
    }*/),
    lastName: Joi.string().min(3).optional(),
    email: Joi.string().regex(/^\S+@\S+$/).email().required(),
    password: Joi.string().required(),
    gender: Joi.string().optional(),
    jobRole: Joi.string().optional(),
    department: Joi.string().optional(),
    address: Joi.string().optional()
    // age: Joi.number().integer()
  })
}), controller.signup);
router.post('/signin', controller.signin);

export default router;
