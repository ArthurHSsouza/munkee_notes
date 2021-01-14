const express = require('express');
const flash = require('connect-flash');

const app = express();
app.use(express.json());

app.disable('x-powered-by');

//static-files

app.use(express.static(__dirname+'/public'));

// body parse
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Sessions
const session = require('express-session');

    //redis
    const redis = require('redis');
    const connectRedis = require('connect-redis');
    const redisStore = connectRedis(session);
    const redisClient = redis.createClient({host: 'localhost', port: 6379});

    redisClient.on('error',(error)=>{
        console.log("Could not stablish connection to redis"+error);
    })
    redisClient.on('connect', (err)=> {
        console.log('Connected to redis successfully');
    });

    //session config

    app.use(
        session({
        store: new redisStore({client: redisClient}),
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        cookie: {  
            maxAge: 60000 * 60 * 24
        }
    }));

//flash init

app.use(flash());

// flash midleware

app.use((req,res,next)=>{
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success"); 
    next();
});

//db conection
require('./db/connection')

//defines engine for views
app.set('view engine','ejs');

//routes
const users = require('./src/routes/users');
const annotations = require('./src/routes/annotations');
const main = require('./src/routes/main');

app.use('/users',users);
app.use('/profileNotes',annotations);
app.use('/',main);

//PORT
const PORT = 3000;
app.listen(PORT, err =>{
    err ? console.log(err) : console.log("conectado na porta: "+PORT);
});