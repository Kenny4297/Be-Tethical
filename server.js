const express = require('express');
const exphbs = require("express-handlebars");
const sequelize = require('./config/connection');
const path = require('path');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
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

//Initializing express
// app = express();

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

// Just for testing purposes until I can get the route to show up, then I will use the sequelize version of this. 
// app.listen(PORT, () => {
//     console.log(`Listening on route ${PORT}...`)
// })

//! For when I get Sequelize stuff running
//^ The "force: true" here forces the database to drop all existing tables and recreate them. When deployed, change this value to "false"
sequelize.sync({ force: false }).then(() => {
    //Also can import the Seeds file then change the above to "true"
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
  });
  

