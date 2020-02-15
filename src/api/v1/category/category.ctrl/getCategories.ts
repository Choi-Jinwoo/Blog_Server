import { Response } from 'express';
import { getRepository } from 'typeorm';
import AuthRequest from '../../../../type/AuthRequest';
import logger from '../../../../lib/logger';
import User from '../../../../entity/User';

export default async (req: AuthRequest, res: Response) => {
}