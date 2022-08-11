// including express
const express = require('express');
const env = require('./config/environment');
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
// requiring passport jwt
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
// mongo store for storing cookie
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
// including flash
const flash = require('connect-flash');
const customMware = require('./config/middleware');

// socket.io(chat server) requires http , thats why including http
const chatServer = require('http').Server(app);
// include chat_sockets in config
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');

const path = require('path');

if(env.name == 'development'){
    app.use(sassMiddleware({
        src : path.join(__dirname, env.asset_path, '/scss'),
        dest : path.join(__dirname , env.asset_path, 'css'),
        debug : true,
        outputStyle : 'extended',
        prefix : '/css'
    }));
}


// middleware
app.use(express.urlencoded());
// using cookie Parser
app.use(cookieParser());
// including static files
app.use(express.static(env.asset_path));
app.use(expressLayouts);
app.use(expressLayouts);
// make the uploads path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));
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
    secret : env.session_cookie_key,
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