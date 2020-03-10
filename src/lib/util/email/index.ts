import sendEmail from './sendEmail';
import subscribe from './form/subscribe';
import newPost from './form/newPost';
import { getRepository } from 'typeorm';
import Subscription from '../../../entity/Subscription';
import cancelSubcribe from './form/cancelSubcribe';
import notice from './form/notice';

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
