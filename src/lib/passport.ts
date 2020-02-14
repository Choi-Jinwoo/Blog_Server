import passport from 'passport';
import Strategy from 'passport-google-oauth20';
import { web } from '../../config/google.json';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new Strategy({
  clientID: web.client_id,
  clientSecret: web.client_secret,
  callbackURL: web.redirect_uris[0],
}, (_accessToken, _refreshToken, profile, done) => {
  process.nextTick(() => {
    const user = profile;
    return done(null, user);
  });
}));

export default passport;