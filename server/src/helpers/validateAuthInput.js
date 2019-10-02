import Joi from '@hapi/joi';

const signupSchema = body => {
  const schema = Joi.object({
    firstName: Joi.string().required().min(3).trim(),
    lastName: Joi.string().min(3).trim(),
    email: Joi.string().regex(/^\S+@\S+$/).email().required().trim(),
    password: Joi.string().required().trim(),
    gender: Joi.string().min(4).trim(),
    jobRole: Joi.string().min(4).trim(),
    department: Joi.string().min(4).trim(),
    address: Joi.string().min(5).trim(),
  });

  return schema.validate(body);
}

const signinSchema = body => {
  const schema = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().required().trim()
  });

  return schema.validate(body);
}

export { signupSchema, signinSchema }
