import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validateCreate } from '../../../../lib/validation/category';
import logger from '../../../../lib/logger';
import Category from '../../../../entity/Category';