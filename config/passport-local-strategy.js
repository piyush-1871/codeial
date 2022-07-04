const passport = require('passport');
const User = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;



// authentication using passport
passport.use(new LocalStrategy({
    usernameField : 'email'
    },
    function(email,password,done){
        // find a user and establish the identity
        User.findOne({email : email}, (err,user)=>{
            if(err){
                console.log('error in finding user --> Passport');
                return done(err);
            }

            if(!user || user.password != password){
                console.log('Invalid username/Password');
                return done(null,false);
            }

            return done(null,user);
        })
    }


));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser((user,done)=>{
    done(null,user.id);
});


// deserializing the user from the key in the cookie
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        if(err){
            console.log('error in finding user--> Passport');
            return done(err);
        }

        return done(null,user);
    })
});


module.exports = passport;