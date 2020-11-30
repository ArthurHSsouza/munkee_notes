const express = require('express');
const flash = require('connect-flash');

const app = express();
app.use(express.json());

//static-files
app.use(express.static('static'));

// body parse
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Sessions
const session = require('express-session')
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {  
        maxAge: 60000 * 60 * 24 * 7
    }
}));
app.use(flash());

// flash midleware
app.use((req,res,next)=>{
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success"); 
    next();
});

//db conection
const sqlite = require('sqlite-sync');
sqlite.connect('./db/database.db');

//models
/*require('./models/users');
require('./models/annotations');*/

//engine
app.set('view engine','ejs');

//routes
const users = require('./routes/users');
const annotations = require('./routes/annotations');
const main = require('./routes/main');

app.use('/users',users);
app.use('/profileNotes',annotations);
app.use('/',main);

//PORT
const PORT = 8080;
app.listen(PORT, err =>{
    err ? console.log(err) : console.log("conectado na porta: "+PORT);
})