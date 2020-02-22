import nodemailer, { SendMailOptions } from 'nodemailer';
import { user, pass } from '../../../../config/email.json';

export default async (email: string | string[], title: string, content: string) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user,
      pass,
    },
  });

  const sendMailOptions: SendMailOptions = {
    from: user,
    to: email,
    subject: title,
    html: content,
  };

  await transporter.sendMail(sendMailOptions);
};
