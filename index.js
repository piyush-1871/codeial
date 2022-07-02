// including express
const express = require('express');

const app = express();

const port = 8000;

// requiring expressLayouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// extract style and scripts from sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// including static files
app.use(express.static(__dirname + '/assets'));

// use express router
app.use('/',require('./routes/index'));
// set up view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,(err)=>{
    if(err){
        console.log(`Error int running the server : ${err}`);
    }
    console.log(`Server is up and running on port : ${port}`);
})