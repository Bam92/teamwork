import Joi from '@hapi/joi';

export const commentSchema = (body) => {
  const schema = Joi.object({
    comment: Joi.string().min(10).required(),
  });

  return schema.validate(body);
};
;
