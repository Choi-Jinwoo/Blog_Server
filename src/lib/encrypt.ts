import 'dotenv/config';
import crypto from 'crypto'

const { ENCRYPT_SECRET } = process.env;

export default (text: string): string => {
  const encrypted = crypto
    .createHmac('sha256', ENCRYPT_SECRET)
    .update(text)
    .digest('hex');

  return encrypted;
}