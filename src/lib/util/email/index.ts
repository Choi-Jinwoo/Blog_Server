import sendEmail from './sendEmail';
import subscribe from './form/subscribe';
import noticeNewPost from './form/noticeNewPost';
import { getRepository } from 'typeorm';
import Subscription from '../../../entity/Subscription';
import cancelSubcribe from './form/cancelSubcribe';

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

export const sendNoticeNewPost = async (postTitle) => {
  const subscriptionRepo = getRepository(Subscription);
  const subscribers = await subscriptionRepo.find();

  const emails: string[] = subscribers.map((subscriber) => {
    return subscriber.email;
  });
  const title = 'New Post';
  const content = noticeNewPost(postTitle);
  await sendEmail(emails, title, content);
}