// including express
const express = require('express');

// used for session cookie
const cookieParser = require('cookie-parser');

const app = express();

const port = 8000;

// requiring expressLayouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// requiring mongoDB
const db = require('./config/mongoose');

// requiring express session
const session = require('express-session');

// requiring passort and passportLocal
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// middleware
app.use(express.urlencoded());
// using cookie Parser
app.use(cookieParser());

// extract style and scripts from sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// including static files
app.use(express.static(__dirname + '/assets'));


// set up view engine
app.set('view engine','ejs');
app.set('views','./views');

// 
app.use(session({
    name : 'codeial',
    // TODO change the secret before deployment
    secret : 'blahh',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000*60*100)
    }
}));

app.use(passport.initialize());

app.use(passport.session());

// use express router
app.use('/',require('./routes/index'));

// make app listen to the port
app.listen(port,(err)=>{
    if(err){
        console.log(`Error int running the server : ${err}`);
    }
    console.log(`Server is up and running on port : ${port}`);
})