/**
 * DO NOT USE IN PRODUCTION!!!
 * 
 * @TODO: store somewhere a lot safer: like environment variables:
 * For example, when you run the node app, you can run it like such:
 * $ JWT_SECRET_KEY=<like the key below, but a new one> node app.js
 * Or simply put it in a shell script.
 * You can access the variable anytime in node using proces.env.JWT_SECRET_KEY
 * @return {string} the secret key
 */
/* "Since JWTs are not signed using asymmetric encryption 
 *  you do not have to generate your secret key using ssh-keygen. 
 *  You can just as easily use a strong password, 
 *  provided its long and random."
 *  SOURCE: https://github.com/docdis/learn-json-web-tokens
 */
// Generatred from: https://www.grc.com/passwords.htm
var jwtSecretKey = "bKFlDolQiKL79cJKUfpdNyjE24ij43pD4DMBcditFobOqhDwMCxiwkuzTiwtBmA";

var STATICS = {
  routeEndpoints: {
    admin: "/admin",
    dm: "/dm"
  },
  defaultImageExtension: ".jpg"
};

STATICS.routeRoots = {
  tableQuery: STATICS.routeEndpoints.dm + "/table-query",
  tableSelection: STATICS.routeEndpoints.dm + "/table-selection",
  privateServe: "../private-serve/",
  userAuth: "/auth"
};

STATICS.routes = {
  createItem: STATICS.routeRoots.tableQuery + "/create",
  editItem: STATICS.routeRoots.tableQuery + "/edit",
  deleteItem: STATICS.routeRoots.tableQuery + "/delete",
  isUniqueItem: STATICS.routeRoots.tableQuery + "/is-unique",
  getItemTypes: STATICS.routeRoots.tableSelection + "/all",
  getSelectedItemType: STATICS.routeRoots.tableSelection + "/type",
  getAllItemsOfType: STATICS.routeRoots.tableSelection + "/items"
};

var express = require('express');

var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

// will automatically choose the language found in the header's Accept-Language parameter
var i18n = require('i18n');
i18n.configure({
  locales: ['en', 'xx'],
  directory: __dirname + '/locales'
});

// using mongoose for almost everything
var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 20,
  host: 'localhost',
  user: 'testuser',
  password: 'ret2fli9',
  database: 'dd_alpha'
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0/dd_alpha', function (err) {
  if (err) {
    console.error("ERROR: Could not connect to database:\n" + err);
  }
});
// connect to db
var schemas = {},
    models = {};

var itemTypes = [
  "ability",
  "item",
  "skill",
  "spell"
];

schemas['ability'] = mongoose.Schema({
  rpg: String,
  name: String,
  'type of ability': String,
  target: String,
  'number of targets': Number,
  'range (ft)': Number,
  'radius (ft)': Number,
  'radius type': String,
  description: String
});

schemas['item'] = mongoose.Schema({
  rpg: String,
  name: String,
  'weight (lbs)': Number,
  'value (gold)': Number,
  'primary type': String,
  description: String
});

schemas['skill'] = mongoose.Schema({
  rpg: String,
  name: String,
  attribute: String,
  'type of skill': String,
  description: String
});

schemas['spell'] = mongoose.Schema({
  rpg: String,
  name: String,
  level: Number,
  'mana cost': Number,
  'cast type': String,
  'cast time': Number,
  components: String,
  'duration type': String,
  'duration time': Number,
  target: String,
  'number of targets': Number,
  'range (ft)': Number,
  'radius (ft)': Number,
  'radius type': String,
  damage: [String],
  'damage type': [String],
  description: String
});

schemas['ammunition'] = mongoose.Schema({
  rpg: String,
  name: String,
  'quantity for value': Number,
  'type of ammunition': String
});

schemas['arcane'] = mongoose.Schema({
  rpg: String,
  name: String,
  rarity: String,
  'hidden property': String
});

schemas['armor'] = mongoose.Schema({
  rpg: String,
  name: String,
  'type of armor': String,
  'armor modifier': Number,
  'dodge modifier': Number,
  'magic resist modifier': Number
});

schemas['consumable'] = mongoose.Schema({
  rpg: String,
  name: String,
  'type of consumable': String,
  rarity: String,
  'locality of ingredient': String,
  'hidden property': String
});

schemas['gear'] = mongoose.Schema({
  rpg: String,
  name: String
});

schemas['melee_weapon'] = mongoose.Schema({
  rpg: String,
  name: String,
  'throw range (ft)': Number,
  property: String,
  damage: [String],
  'damage type': [String]
});

schemas['miscellaneous'] = mongoose.Schema({
  rpg: String,
  name: String
});

schemas['ranged_weapon'] = mongoose.Schema({
  rpg: String,
  name: String,
  'range (ft)': Number,
  property: String,
  damage: [String],
  'damage type': [String]
});

schemas['tool'] = mongoose.Schema({
  rpg: String,
  name: String
});

schemas['valuable'] = mongoose.Schema({
  rpg: String,
  name: String,
  rarity: String
});

models['ability'] = mongoose.model('ability', schemas['ability']);
models['item'] = mongoose.model('item', schemas['item']);
models['skill'] = mongoose.model('skill', schemas['skill']);
models['spell'] = mongoose.model('spell', schemas['spell']);
models['ammunition'] = mongoose.model('ammunition', schemas['ammunition']);
models['arcane'] = mongoose.model('arcane', schemas['arcane']);
models['armor'] = mongoose.model('armor', schemas['armor']);
models['consumable'] = mongoose.model('consumable', schemas['consumable']);
models['gear'] = mongoose.model('gear', schemas['gear']);
models['melee_weapon'] = mongoose.model('melee_weapon', schemas['melee_weapon']);
models['miscellaneous'] = mongoose.model('miscellaneous', schemas['miscellaneous']);
models['ranged_weapon'] = mongoose.model('ranged_weapon', schemas['ranged_weapon']);
models['tool'] = mongoose.model('tool', schemas['tool']);
models['valuable'] = mongoose.model('valuable', schemas['valuable']);

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// @TODO: Warns against using bodyParser because it can create unlimited temp files
// SOURCE: http://andrewkelley.me/post/do-not-use-bodyparser-with-express-js.html
// NOTE: this may be resolved since we don't use bodyParser() directly.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(i18n.init);

//// setup JWT authentication for specific routes
// before any of the back-end requests, we first check if we need to authenticate the user's JWT
// use on any path that has secured data
app.use([STATICS.routeEndpoints.admin], function (req, res, next) {
  var token;

  //// get the token
  // typically, we attempt to follow the Bearer scheme authorization header method,
  // if that isn't followed, attempt to extract the token by some other means.
  if (req.headers && req.headers["authorization"]) {
    token = req.headers["authorization"];
    // remove the Bearer phrase from the token
    if (token.indexOf("Bearer ") === 0) {
      token = token.substring("Bearer ".length);
    }
  }
  // images/videos cannot have authenticated headers, so instead look at the url
  else if (req.query && req.query.token) {
    // @TODO: Do we need to remove the token query from the URL?
    token = req.query.token;
  }
  // attempt to extract the token from other common means
  else {
    token = (req.body && req.body.token) || (req.headers && req.headers['x-access-token']);
  }
  
  // if there is no token, do not fulfill the request
  if (!token) {
    return res.status(403).send("No token given. Please attempt to log in.");
  }

  // verify the token is valid
  jwt.verify(token, jwtSecretKey, function(err, decoded) {
    if (err) {
      return res.status(403).send("Failed to authenticate JSON web token for a user. Please attempt to log in.");
    }

    // save the token payload and pass to next route
    req.jwtPayload = decoded;
    next();
  });
});

// back-end calls
var genericTableQueries = require('./lib/generic-table-queries/index')(app, models, STATICS, bodyParser, itemTypes);
var tableSelection = require('./lib/table-selection/index')(app, models, STATICS, bodyParser, itemTypes);

//var userAuth = require('./lib/user-auth/index')(app, pool, STATICS, bodyParser, bcrypt, jwt, jwtSecretKey);

// view engine setup
//commented out since we control the view with angular
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

/**
 * Development Settings
 */
if (app.get('env') === 'development') {

  // This will change in production since we'll be using the dist folder
  app.use(express.static(path.join(__dirname, '../dd-angular')));
  // This covers serving up the index page
  app.use(express.static(path.join(__dirname, '../dd-angular/.tmp')));
  app.use(express.static(path.join(__dirname, '../dd-angular/app')));

  // route to patient page
  // app.get(STATICS.routeEndpoints.patient, function(req, res) {
  //   // This will change in production since we'll be using the dist folder
  //   res.sendFile(path.join(__dirname, '../dd-angular/app/patient.html'));
  // });

  // NOTE: UPDATE: I want 404 errors.  Client-side routing isn't working.
  // // at this point, all additional routes should be redirected back to the angular main app  
  // app.use(function(req, res, next) {
  //   // This will change in production since we'll be using the dist folder
  //   res.sendFile(path.join(__dirname, '../mdot-angular/app/index.html'));
  // });

  // IGNORE: NOTE: We don't want to catch 404 (Not found) since we need to redirect these to the angular app
  // IGNORE: We are using client-side routing
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // Error Handling
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: err
      });
  });
}

/**
 * Production Settings
 */
if (app.get('env') === 'production') {

  app.use(express.static(path.join(__dirname, '../mdot-angular/dist')));

  // // route to login page
  // app.get(STATICS.routeEndpoints.login, function(req, res) {
  //   // This will change in production since we'll be using the dist folder
  //   res.sendFile(path.join(__dirname, '../mdot-angular/dist/routes/login/index.html'));
  // });

  // NOTE: UPDATE: I want 404 errors.  Client-side routing isn't working.
  // // changes it to use the optimized version for production
  // app.use(function(req, res, next) {
  //   res.sendFile(path.join(__dirname, '../mdot-angular/dist/index.html'));
  // });

  // IGNORE: NOTE: We don't want to catch 404 (Not found) since we need to redirect these to the angular app
  // IGNORE: We are using client-side routing  
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: {}
      });
  });
}

module.exports = app;
