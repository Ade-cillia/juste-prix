//Env
require('dotenv').config()

// Require
const express = require('express');
const favicon = require('serve-favicon');
const session = require('cookie-session');
const path = require('path');

// Init Routes
const indexRouter = require('./routes/indexRouter');

// Init app
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/image/favicon.ico'));
app.use(session({secret: process.env.SECRET_SESSION_KEY}));

// Apply Routes
app.use(indexRouter);

// Handlers
app.use((req,res)=>{
  res.status(404);
  res.render('404', {});
});

// Listener App
app.listen(process.env.PORT || 8080, () => {
  console.log(`Listening at ${process.env.URL}:${process.env.PORT}`);
  console.log(`Running in ${process.env.NODE_ENV} mode`);
});