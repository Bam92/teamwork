import Joi from '@hapi/joi';

const articleSchema = (body) => {
  const schema = Joi.object({
    title: Joi.string().required().min(10).max(50),
    article: Joi.string().required().min(20).max(1000),
    category: Joi.string(),
  });

  return schema.validate(body);
};

export { articleSchema };
