const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");
const { JWT_SECRET } = require("./keys");

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWT_SECRET;

const jwtStrategy = new JwtStrategy(opts, function (jwtPayLoad, done) {
  try {
    const user = User.findById(jwtPayLoad._id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    console.log("Error in finding user from JWT");
    return;
  }
});

passport.use(jwtStrategy);

module.exports = passport;
