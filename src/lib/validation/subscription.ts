import Joi from 'joi';
import validate from './validate';
import { Request, Response } from 'express';

export const validateSubscribe = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  });

  return validate(req, res, schema);
};

export const validateCancelSubscribe = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  });

  return validate(req, res, schema);
};