var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var events = require('./routes/events');
var api = require('./routes/api');

events_list = { events: [
						{id: 0,
						 title: 'event 0',
						 location: 'New Haven',
						 image: 'http://blah.com/image.png',
						 time: '9/19/17 23:30',
						 attendees: ['jacob.benedicksen@yale.edu']
						},
						{id:1,
						 title: 'event 1',
						 location: 'new york',
						 image: 'http://nyc.com/nyc.png',
						 time: '10/20/17 10:10',
						 attendees: ['abhi.moturi@yale.edu', 'edward.dcruz@yale.edu']
						},
						{id:2,
						 title: 'event 2',
						 location: 'jfk',
						 image: 'http://nyc.com/jfk.jpg',
						 time: '10/10/18 11:11',
						 attendees: ['abhi.moturi@yale.edu']
						}
					  ]
			  };
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('/Users/abhirammoturi/Desktop/node/evently/public'));

app.use('/', index);
app.use('/events', events);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
