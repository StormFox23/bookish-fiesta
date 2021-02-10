const express = require("express");
const app = express();



var session = require('express-session');
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

//var passport = require('passport');
const passport = require("./passport/setup");
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var configDB = require('./config/database.js');

// configuration ===============================================================

mongoose
    .connect(configDB.url, { useNewUrlParser: true })
    .then(console.log(`MongoDB connected ${configDB.url}`))
    .catch(err => console.log(err));


//app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(
    session({
        secret: "ludovico",
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());



require('./routes/routes')(app);
//app.use(logger('dev')); // log every request to the console
//app.use(cookieParser()); // read cookies (needed for auth)

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // Express Session
// app.use(
//     session({
//         secret: "very secret this is",
//         resave: false,
//         saveUninitialized: true,
//         store: new MongoStore({ mongooseConnection: mongoose.connection })
//     })
// );

// require('./routes/routes')(app);
// // Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

//app.use(bodyParser()); // get information from html forms

//app.set('view engine', 'ejs'); // set up ejs for templating

//required for passport
// app.use(session({ secret: 'ludovico' })); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session


const port = 3000;
app.listen(port, () => console.log(
    `App listening on port ${port}!`
));

// app.get("/", (req, res) => res.send("Welcome!"));
// app.listen(port, () => console.log(
//     `Example app listening on port ${port}!`
// ));