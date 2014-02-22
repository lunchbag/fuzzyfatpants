var express = require('express')
  , app = express()
  // database
  , mongodb = require('mongodb')
  , mongoose = require('mongoose')
  , db = require('./model/db')
  // utils
  , passport = require('passport')
  , exphbs = require('express3-handlebars')
  , hbs
  // models
  , user = require('./model/user')
  , Dog = require('./model/dog')
  // controllers
  , userController = require('./controllers/user')
  , petController = require('./controllers/pet')
  , main = require('./controllers/main');

require('./model/passport')(passport);

// HELPERS =============================================================================================================

hbs = exphbs.create({
  helpers: {
    derp: function() { return 'hi' }
  }
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
};

// CONFIGURATIONS ======================================================================================================

// party like its ____
app.listen(1998);

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'handlebars');
  app.engine('handlebars', hbs.engine);
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'derping so hard' })); // CHANGE THIS SECRET!
  // Remember Me middleware
  app.use( function (req, res, next) {
    if ( req.method == 'POST' && req.url == '/login' ) {
      if ( req.body.rememberme ) {
        req.session.cookie.maxAge = 2592000000; // 30*24*60*60*1000 Rememeber 'me' for 30 days
      } else {
        req.session.cookie.expires = false;
      }
    }
    next();
  });
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/../../public'));
});

// ROUTES ==============================================================================================================

app.get('/', function(req, res){
  if (req.user) {
    var pets = Dog.find({ owner_id: req.user.email }, function(derp, dog) {
      res.render('index', { user: req.user, dog: dog });
    });
  } else {
    res.render('index')
  }
});

// app.get('/account', ensureAuthenticated, function(req, res){ res.render('account', { user: req.user }); });
app.get('/login', function(req, res){ res.render('login', { user: req.user, message: req.session.messages }); });
app.get('/signup', function(req, res){ res.render('signup'); })
app.get('/logout', function(req, res){ req.logout(); res.redirect('/'); });
app.get('/pet/new', function(req, res) {
  res.render('pet/new');
});

app.get('/pet/:id', function(req, res) {
  if (req.user) {
    var pets = Dog.findOne({ name: req.params.id }, function(derp, dog) {
      res.render('pet/show', { user: req.user, dog: dog });
    });
  } else {
    res.render('index')
  }
});

app.post('/pet/new', function(req, res, next) {
  console.log(req.user.email)
  req.body.owner_id = req.user.email;
  console.log(req.body);
  petController.addNewDog(req.body, function(success) {
    if (success) {
      res.redirect('/');
    } else {
      res.render('/');
    }
  })
});

app.post('/signup', function(req, res, next) {
  userController.addNewUser(req.body, function(success) {
    if (success) {
      res.redirect('/');
    } else {
      res.render('signup');
    }
  });
});

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      req.session.messages =  [info.message];
      return res.redirect('/login')
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
});

// DERP ================================================================================================================