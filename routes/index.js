var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(events_list.events);
  res.render('index', { title: 'Evently', events: events_list});
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Evently' });
});

module.exports = router;
