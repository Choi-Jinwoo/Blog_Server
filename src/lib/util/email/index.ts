import sendEmail from './sendEmail';
import subscribe from './form/subscribe';
import newPost from './form/newPost';
import { getRepository } from 'typeorm';
import Subscription from '../../../entity/Subscription';
import cancelSubcribe from './form/cancelSubcribe';
import notice from './form/notice';
import emailAuthCode from './form/emailAuthCode';
import newComment from './form/newComment';
import newReply from './form/newReply';

export const sendSubscribe = async (email) => {
  const title = 'Subscribed';
  const content = subscribe();

  await sendEmail(email, title, content);
}

export const sendCancelSubscribe = async (email) => {
  const title = 'Canceled Subscription';
  const content = cancelSubcribe();

  await sendEmail(email, title, content);
}

export const sendNewPost = async (postTitle) => {
  const subscriptionRepo = getRepository(Subscription);
  const subscribers = await subscriptionRepo.find();

  const emails: string[] = subscribers.map((subscriber) => {
    return subscriber.email;
  });
  const title = 'New Post';
  const content = newPost(postTitle);
  await sendEmail(emails, title, content);
}

export const sendNotice = async (noticeTitle, noticeContent) => {
  const subscriptionRepo = getRepository(Subscription);
  const subscribers = await subscriptionRepo.find();

  const emails: string[] = subscribers.map((subscriber) => {
    return subscriber.email;
  });
  const title = 'Notice';
  const content = notice(noticeTitle, noticeContent);
  await sendEmail(emails, title, content);
}

export const sendEmailAuthCode = async (email, code) => {
  const title = '이메일 인증';
  const content = emailAuthCode(code);
  await sendEmail(email, title, content);
}

export const sendNewComment = async (email, postTitle, idx) => {
  const title = '새로운 댓글이 달렸어요!';
  const content = newComment(postTitle, idx);
  await sendEmail(email, title, content);
}

export const sendNewReply = async (email, postTitle, idx) => {
  const title = '새로운 답글이 달렸어요!';
  const content = newReply(postTitle, idx);
  await sendEmail(email, title, content);
}