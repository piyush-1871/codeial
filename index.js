// including express
const express = require('express');
// used for session cookie
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
// requiring expressLayouts
const expressLayouts = require('express-ejs-layouts');

// requiring mongoDB
const db = require('./config/mongoose');
// requiring express session
const session = require('express-session');
// requiring passort and passportLocal
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
// mongo store for storing cookie
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
// including flash
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(sassMiddleware({
    src : __dirname + '/assets/scss',
    dest : __dirname +  '/assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix : '/css'
}));

// middleware
app.use(express.urlencoded());
// using cookie Parser
app.use(cookieParser());
// including static files
app.use(express.static(__dirname + '/assets'));
app.use(expressLayouts);
app.use(expressLayouts);
// extract style and scripts from sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
// set up view engine
app.set('view engine','ejs');
app.set('views','./views');
// mongo store is used to store the session cookie in db
app.use(session({
    name : 'codeial',
    // TODO change the secret before deployment
    secret : 'blahh',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000*60*100)
    },
    store : new MongoStore(
        {
        mongooseConnection : db,
        autoRemove : 'disabled',
        },
        (err)=>{
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
// setup flash
app.use(flash());
app.use(customMware.setFlash);
// use express router
app.use('/',require('./routes/index'));
// make app listen to the port
app.listen(port,(err)=>{
    if(err){
        console.log(`Error int running the server : ${err}`);
    }
    console.log(`Server is up and running on port : ${port}`);
})