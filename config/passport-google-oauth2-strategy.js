const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    //these are from the console.developers.google.com of our project "codeial-sample"
        clientID: "363303393259-u15mb5v2f995bduvmppbpplfdpud6s5r.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8005/users/auth/google/callback",
    },
    //this access token is given by google and when it is expired refresh token is used to generate a new token
    //profile contains user information
    //asking google to establish identity of an email id which has been selected by the user
    function(accessToken, refreshToken, profile, done){
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){console.log('error in google strategy-passport', err); return;}

            console.log(profile);

            if(user){
                //if found, set this user as req.user
                return done(null, user);
            }else{
                //if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){console.log('errr in creating user google strategy-passport', err); return;}

                    return done(null, user);
                })
            }

        });

    }

));

module.exports = passport;