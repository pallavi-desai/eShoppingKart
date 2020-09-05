/**

 @author    Rashmika Ibrahimpatnam => B00832190

 **/
const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const User = require("../model/userModel");
const jwtdata = {};
jwtdata.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
jwtdata.secretOrKey = "secret";

//using passport-jwt strategy for authentication
module.exports = authenticate => {
    authenticate.use(
        new jwtStrategy(jwtdata, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
              .then(user => {
                if (user) {
                  return done(null, user);
                }
                return done(null, false);
              })
              .catch(error => console.log(error));
          })
    )
}