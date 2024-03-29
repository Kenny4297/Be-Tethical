const express = require('express');
const exphbs = require("express-handlebars");
const sequelize = require('./config/connection');
const path = require('path');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({
  helpers: {
    format_date: helpers.format_date
  }
});
const app = express();

//Creating the proper port
const PORT = process.env.PORT || 3002;

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Creating a session
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
      db: sequelize
  })
};


//Getting the HB engine set up
app.engine('handlebars', hbs.engine); // registering a rendering engine w/ express
app.set('view engine', 'handlebars'); // designating handlebars as our rendering engine


// Importing some necessary middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded( { extended: true }))
app.use(express.json());

//Uses the session we have
app.use(session(sess));

//Make sure your routes are declared AFTER your sessions
app.use(routes);

//! For when I get Sequelize stuff running
//^ The "force: true" here forces the database to drop all existing tables and recreate them. When deployed, change this value to "false"

const forceValue = (process.env.NODE_ENV === "production") ? false : false;

sequelize.sync({ force: forceValue }).then(() => {
    //Also can import the Seeds file then change the above to "true"
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
  });


