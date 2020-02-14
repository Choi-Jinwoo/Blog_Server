import passport from 'passport';
import Strategy from 'passport-google-oauth20';
import { web } from '../../config/google.json';
import { getRepository } from 'typeorm';
import User from '../entity/User';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new Strategy({
  clientID: web.client_id,
  clientSecret: web.client_secret,
  callbackURL: web.redirect_uris[0],
}, (_accessToken, _refreshToken, profile, done) => {
  process.nextTick(async () => {
    console.log(profile);
    const user = profile;
    const userRepo = getRepository(User);
    const isRegisted: User = await userRepo.findOne({
      where: {
        id: user.id,
      },
    });
    if (!isRegisted)
      return done('UNAUTHORIZED', user);

    return done(null, user);
  });
}));

export default passport;