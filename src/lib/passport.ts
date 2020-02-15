import passport from 'passport';
import Strategy from 'passport-google-oauth20';
import { web } from '../../config/google.json';
import { getRepository } from 'typeorm';
import User from '../entity/User';

// seesion 저장
passport.serializeUser((user, done) => {
  done(null, user);
});

// req.user 생성
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use('google-login', new Strategy({
  clientID: web.client_id,
  clientSecret: web.client_secret,
  callbackURL: web.redirect_uris[0],
}, (_accessToken, _refreshToken, profile, done) => {
  process.nextTick(async () => {
    const user = profile;
    const userRepo = getRepository(User);
    const isRegisted: User = await userRepo.findOne({
      where: {
        id: user.id,
      },
    });
    if (!isRegisted)
      return done('UNAUTHORIZED', user);

    return done(null, isRegisted);
  });
}));

passport.use('google-register', new Strategy({
  clientID: web.client_id,
  clientSecret: web.client_secret,
  callbackURL: web.redirect_uris[1],
}, (_accessToken, _refreshToken, profile, done) => {
  process.nextTick(async () => {
    const user = profile;
    const userRepo = getRepository(User);
    const isRegisted: User = await userRepo.findOne({
      where: {
        id: user.id,
      },
    });
    if (isRegisted)
      return done('CONFLICT', user);

    const registUser = new User;
    registUser.id = user.id;
    registUser.name = user.displayName;
    registUser.email = user.emails[0].value;
    await userRepo.save(registUser);

    return done(null, user);
  });
}));
export default passport;