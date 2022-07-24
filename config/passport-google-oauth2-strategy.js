const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID : "375333308917-1174fu6k9sf1k7aeor2570b7n9aoro2p.apps.googleusercontent.com",
    clientSecret : "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",
    callbackURL : "http://localhost:8000/user/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email : profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('error in google strategy passport',err);
                return;
            }

            console.log(profile);
            if(user){
                // if found set this user as req.user
                return done(null, user);
            }else{
                // if not found , create the user and set it as req.user
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')
                },function(err, user){
                    if(err){
                        console.log('error in creating user',err);
                        return;
                    }
                    return done(null, user);
                })
            }
        })
    }
));

module.exports = passport;